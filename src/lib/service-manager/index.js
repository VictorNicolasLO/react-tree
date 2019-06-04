import { useMemo, useEffect, useState } from 'react';
import ServiceStore, { instance } from './service-store';
import { ServiceDecorator, injectDecorator } from './decorators';
import LayoutServiceLib from './layout-service';
import { useServiceHook, useControllerHook } from './hooks';

export { component } from './component';

export const serviceStore = instance;

export const injectService = serviceStore.get;

export const useService = useServiceHook;
export const useController = useControllerHook;
export const LayoutService = LayoutServiceLib;

// Decorators
export const service = ServiceDecorator;
export const inject = injectDecorator;
