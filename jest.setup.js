/* eslint-disable @typescript-eslint/no-require-imports */
import "@testing-library/jest-dom";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}

if (typeof global.Request === "undefined") {
  global.Request = class Request {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method || "GET";
      this.headers = new Map(Object.entries(init?.headers || {}));
      this.body = init?.body;
    }
  };
}

if (typeof global.Response === "undefined") {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || "OK";
      this.headers = new Map(Object.entries(init?.headers || {}));
    }

    json() {
      return Promise.resolve(JSON.parse(this.body));
    }

    text() {
      return Promise.resolve(this.body);
    }
  };
}

jest.mock("next/cache", () => ({
  unstable_cache: (fn) => fn,
  revalidateTag: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    has: jest.fn(),
    getAll: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    entries: jest.fn(),
  }),
  usePathname: () => "/dashboard",
}));

jest.mock("chart.js", () => ({
  Chart: Object.assign(
    jest.fn().mockImplementation(() => ({
      destroy: jest.fn(),
      update: jest.fn(),
      render: jest.fn(),
    })),
    {
      register: jest.fn(),
    }
  ),
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
  LineElement: {},
  PointElement: {},
  ArcElement: {},
  registerables: [],
}));

jest.mock("react-chartjs-2", () => ({
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
  Line: () => <div data-testid="line-chart">Line Chart</div>,
  Pie: () => <div data-testid="pie-chart">Pie Chart</div>,
}));

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Array(4),
  })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}));

const warn = console.warn;
console.warn = (msg, ...args) => {
  if (typeof msg === "string" && msg.includes("outdated JSX transform")) {
    return;
  }
  warn(msg, ...args);
};
