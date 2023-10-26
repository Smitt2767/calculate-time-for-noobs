import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  AppWrapper,
  Button,
  Container,
  Form,
  FormItem,
  GithubLink,
  Input,
  InputWrapper,
  Title,
  TitleContainer,
} from "./components";
import { ReactComponent as ArrowDownLeft } from "./assets/icons/arrow-down-left-thin.svg";
import { ReactComponent as ArrowUpRight } from "./assets/icons/arrow-up-right-thin.svg";
import { ReactComponent as Trash } from "./assets/icons/trash-thin.svg";
import { ReactComponent as Github } from "./assets/icons/github-logo-fill.svg";
import {
  Storage,
  getDifferenceInSeconds,
  getEndTime,
  getHoursMinutesSecondsText,
} from "./utils";
import { useLayoutEffect, useState } from "react";
import LogInfo, { LogInfoProps } from "./components/LogInfo";

const TOTAL_SECONDS = 8 * 60 * 60 + 30 * 60;
const GITHUB_REPO_LINK =
  "https://github.com/Smitt2767/calculate-time-for-noobs";

type Entry = [string | null, string | null];

const defaultValues: {
  entries: Entry[];
} = {
  entries: [[null, null]],
};

const defaultLogInfo: LogInfoProps = {
  effectiveHours: "",
  endTime: "",
  grossHours: "",
  remainingHours: "",
};

function App() {
  const [logInfo, setLogInfo] = useState<LogInfoProps>(defaultLogInfo);

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "all",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "entries",
  });

  useLayoutEffect(() => {
    const info = Storage.get<{
      date: string;
      entries: Entry[];
      logInfo: LogInfoProps;
    }>("log_info");
    if (info) {
      replace(info.entries);
      setLogInfo(info.logInfo);
    }
  }, [replace]);

  const onSubmit: SubmitHandler<typeof defaultValues> = ({ entries }) => {
    let completedSeconds = 0;
    entries.forEach((entry) => {
      if (entry.every(Boolean)) {
        completedSeconds += getDifferenceInSeconds(
          entry[0] as string,
          entry[1] as string
        );
      }
    });

    const firstInLog = entries[0][0];
    const lastInLog = entries[entries.length - 1][0];
    const lastOutLog = entries[entries.length - 1][1];

    const remainingSeconds = TOTAL_SECONDS - completedSeconds;
    const effectiveSeconds = completedSeconds;

    const grossSeconds =
      firstInLog && (lastOutLog || lastInLog)
        ? getDifferenceInSeconds(
            firstInLog as string,
            (lastOutLog || lastInLog) as string
          )
        : 0;
    const endTime =
      lastInLog && !lastOutLog ? getEndTime(lastInLog, remainingSeconds) : "";

    const info = {
      effectiveHours: getHoursMinutesSecondsText(effectiveSeconds),
      grossHours: getHoursMinutesSecondsText(grossSeconds),
      remainingHours: getHoursMinutesSecondsText(remainingSeconds),
      endTime,
    };

    setLogInfo(info);

    Storage.set("log_info", {
      date: new Date(),
      entries,
      logInfo: info,
    });
  };

  const handleAddLog = () => {
    append([[null, null]]);
  };

  const handleReset = () => {
    reset();
    setLogInfo(defaultLogInfo);
    Storage.remove("log_info");
  };

  return (
    <AppWrapper>
      <Container>
        <TitleContainer>
          <Title>Calculate Hours</Title>
          <GithubLink target="_blank" href={GITHUB_REPO_LINK}>
            <Github height={20} width={20} />
          </GithubLink>
        </TitleContainer>
        <LogInfo {...logInfo} />
        <Form id="track-log-form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((filed, index) => (
            <FormItem key={filed.id}>
              <InputWrapper>
                <ArrowDownLeft fill="#86c06a" height={24} width={24} />
                <Input
                  type="time"
                  step={1}
                  {...register(`entries.${index}.0` as const)}
                />
              </InputWrapper>
              <InputWrapper>
                <ArrowUpRight fill="#fa5f5f" height={24} width={24} />
                <Input
                  type="time"
                  step={1}
                  {...register(`entries.${index}.1` as const)}
                />
              </InputWrapper>
              <Button
                $icon
                $transparent
                $hidden={fields.length <= 1}
                type="button"
                onClick={() => remove(index)}
              >
                <Trash fill="#fa5f5f" height={20} width={20} />
              </Button>
            </FormItem>
          ))}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "space-between",
            }}
          >
            <Button type="button" onClick={handleAddLog}>
              Add Log
            </Button>
            <Button type="button" onClick={handleReset}>
              Clear all Logs
            </Button>
          </div>
        </Form>

        <Button $fullWidth $size="lg" type="submit" form="track-log-form">
          Calculate
        </Button>
      </Container>
    </AppWrapper>
  );
}

export default App;
