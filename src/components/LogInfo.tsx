import { styled } from "styled-components";

export type LogInfoProps = {
  remainingHours: string;
  effectiveHours: string;
  grossHours: string;
  endTime: string;
};

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  flex-shrink: 0;
`;

const LogWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  & p:first-of-type {
    margin-bottom: 4px;
  }
  & p:nth-of-type(2) {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
`;

type LogProps = {
  title: string;
  value: string;
};

function Log({ title, value }: LogProps) {
  return (
    <LogWrapper>
      <p>{title}</p>
      <p>{value || "Not available"}</p>
    </LogWrapper>
  );
}

function LogInfo({
  effectiveHours,
  endTime,
  grossHours,
  remainingHours,
}: LogInfoProps) {
  return (
    <Wrapper>
      <Log title="Gross Hours" value={grossHours} />
      <Log title="Effective Hours" value={effectiveHours} />
      <Log title="Remaining Hours" value={remainingHours} />
      <Log title="End Time" value={endTime} />
    </Wrapper>
  );
}

export default LogInfo;
