import {
  ServiceFunctionEvents,
  ServiceFunctionDefinitions,
  ServiceFunctions,
} from "../../types/app-types";

const service = require("./service");

export interface HostService {
  definition: ServiceFunctionDefinitions<HostFunctionDefinitions>;
  functions: ServiceFunctions<HostFunctions>;
}

export interface HostFunctionDefinitions {
  getHosts: ServiceFunctionEvents;
}

export interface HostFunctions {
  getHosts(path: string): string;
}

module.exports = { ...service };
