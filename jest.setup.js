import "@testing-library/jest-dom";

// Suppress React outdated JSX transform warning
const warn = console.warn;
console.warn = (msg, ...args) => {
  if (typeof msg === "string" && msg.includes("outdated JSX transform")) {
    return;
  }
  warn(msg, ...args);
};
