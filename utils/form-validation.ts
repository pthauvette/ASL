import type { FormData, StepStatus } from './form-types';

export const validateStep1 = (data: FormData): boolean => {
  return !!(
    data.accountName &&
    data.address &&
    data.cityId &&
    data.provinceId &&
    data.postalCode &&
    data.email &&
    data.phone
  );
};

export const validateStep2 = (data: FormData): boolean => {
  return !!(
    data.membershipTypeId &&
    data.membershipPackageId &&
    data.emailBilling &&
    data.paymentMethod
  );
};

export const validateStep3 = (data: FormData): boolean => {
  return !!(
    data.mainContact.civility &&
    data.mainContact.firstName &&
    data.mainContact.lastName &&
    data.mainContact.email
  );
};

export const validateStep4 = (data: FormData, visitedSteps: number[]): boolean => {
  const hasBeenVisited = visitedSteps.includes(4);
  if (!hasBeenVisited) {
    return false;
  }

  if (data.delegates.length === 0) {
    return true;
  }

  return data.delegates.every(
    (delegate) =>
      delegate.firstName &&
      delegate.lastName &&
      delegate.email,
  );
};

export const validateStep5 = (data: FormData, hasActiveEvents: boolean, visitedSteps: number[]): boolean => {
  if (hasActiveEvents) {
    const hasBeenVisited = visitedSteps.includes(5);
    return hasBeenVisited;
  }
  return data.finalConsent;
};

export const validateStep6 = (data: FormData): boolean => {
  return data.finalConsent;
};

export const getStepStatus = (
  stepId: number, 
  currentStep: number, 
  formData: FormData, 
  visitedSteps: number[], 
  hasActiveEvents: boolean
): StepStatus => {
  if (stepId === currentStep) {
    return "current";
  }

  const hasBeenVisited = visitedSteps.includes(stepId);

  let isValid = false;
  switch (stepId) {
    case 1:
      isValid = validateStep1(formData);
      break;
    case 2:
      isValid = validateStep2(formData);
      break;
    case 3:
      isValid = validateStep3(formData);
      break;
    case 4:
      isValid = validateStep4(formData, visitedSteps);
      break;
    case 5:
      isValid = validateStep5(formData, hasActiveEvents, visitedSteps);
      break;
    case 6:
      isValid = validateStep6(formData);
      break;
  }

  if (isValid) {
    return "completed";
  }

  if (hasBeenVisited) {
    return "incomplete";
  }

  return "upcoming";
};

export const allStepsCompleted = (
  maxSteps: number, 
  currentStep: number, 
  formData: FormData, 
  visitedSteps: number[], 
  hasActiveEvents: boolean
): boolean => {
  const stepsToCheck = Array.from({ length: maxSteps }, (_, i) => i + 1);
  return stepsToCheck.every((stepId) => {
    const status = getStepStatus(stepId, currentStep, formData, visitedSteps, hasActiveEvents);
    return status === "completed";
  });
};