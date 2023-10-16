import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  AppWrapper,
  Button,
  Container,
  Form,
  FormItem,
  Input,
  InputWrapper,
  Title,
} from "./components";
import { ReactComponent as ArrowDownLeft } from "./assets/icons/arrow-down-left-thin.svg";
import { ReactComponent as ArrowUpRight } from "./assets/icons/arrow-up-right-thin.svg";
import { ReactComponent as Trash } from "./assets/icons/trash-thin.svg";
import {
  getDifferenceInMinutes,
  getEndTime,
  getHoursMinutesText,
} from "./utils";
import { useState } from "react";
import LogInfo, { LogInfoProps } from "./components/LogInfo";

const TOTAL_MINUTES = 8 * 60 + 30;

type Entry = [string | null, string | null];

const defaultValues: {
  entries: Entry[];
} = {
  entries: [[null, null]],
};

function App() {
  const [logInfo, setLogInfo] = useState<LogInfoProps>({
    effectiveHours: "",
    endTime: "",
    grossHours: "",
    remainingHours: "",
  });

  const { control, register, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({ entries }) => {
    let completedMinutes = 0;
    entries.forEach((entry) => {
      if (entry.every(Boolean)) {
        completedMinutes += getDifferenceInMinutes(
          entry[0] as string,
          entry[1] as string
        );
      }
    });

    const firstInLog = entries[0][0];
    const lastInLog = entries[entries.length - 1][0];
    const lastOutLog = entries[entries.length - 1][1];

    const remainingMinutes = TOTAL_MINUTES - completedMinutes;
    const effectiveMinutes = completedMinutes;
    const grossMinutes =
      firstInLog && (lastOutLog || lastInLog)
        ? getDifferenceInMinutes(
            firstInLog as string,
            (lastOutLog || lastInLog) as string
          )
        : 0;
    const endTime =
      lastInLog && !lastOutLog ? getEndTime(lastInLog, remainingMinutes) : "";

    setLogInfo({
      effectiveHours: getHoursMinutesText(effectiveMinutes),
      grossHours: getHoursMinutesText(grossMinutes),
      remainingHours: getHoursMinutesText(remainingMinutes),
      endTime,
    });
  };

  const handleAddLog = () => {
    append([[null, null]]);
  };

  return (
    <AppWrapper>
      <Container>
        <Title>Calculate Hours</Title>
        <LogInfo {...logInfo} />
        <Form id="track-log-form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((filed, index) => (
            <FormItem key={filed.id}>
              <InputWrapper>
                <ArrowDownLeft fill="#86c06a" height={24} width={24} />
                <Input
                  type="time"
                  {...register(`entries.${index}.0` as const)}
                />
              </InputWrapper>
              <InputWrapper>
                <ArrowUpRight fill="#fa5f5f" height={24} width={24} />
                <Input
                  type="time"
                  {...register(`entries.${index}.1` as const)}
                />
              </InputWrapper>
              {fields.length > 1 && (
                <Button
                  $icon
                  $transparent
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash fill="#fa5f5f" height={20} width={20} />
                </Button>
              )}
            </FormItem>
          ))}
          <div style={{ display: "flex", gap: 12 }}>
            <Button type="button" onClick={handleAddLog}>
              Add Log
            </Button>
          </div>
        </Form>
        <Button $size="lg" type="submit" form="track-log-form">
          Calculate
        </Button>
      </Container>
    </AppWrapper>
  );
}

export default App;
