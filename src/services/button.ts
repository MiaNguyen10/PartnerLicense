export const disableButton = (disable = true): void => {
  const button = document.querySelector('button[type="submit"]') as any;
  if (button) button.disabled = disable;
};

const button = {
  disableButton,
};

export default button;
