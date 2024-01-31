/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from "react";

export type STEP = {
  label: string;
  description?: string;
  component: ReactElement;
};

interface useStepperProps {
  steps: number;
  activeIndex?: number;
}

const useStepper = (props: useStepperProps) => {
  const { steps, activeIndex: initialActiveIndex = 0 } = props;

  const [active, setActive] = useState<number>(initialActiveIndex);

  useEffect(() => {
    if (props.activeIndex !== undefined && props.activeIndex !== active) {
      setActive(props.activeIndex);
    }
  }, [props.activeIndex, steps]);

  const nextStep = () =>
    setActive((current: number) =>
      current < steps - 1 ? current + 1 : current
    );

  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  return {
    prevStep,
    nextStep,
    setActive,
    active,
  };
};

export default useStepper;
