import provider from './provider';
import datasources from './datasources';
import networking from './networking';
import security from './security';
import compute from './compute';
import storage from './storage';
import databases from './databases';
import loadbalancing from './loadbalancing';
import dns from './dns';
import monitoring from './monitoring';
import miscellaneous from './miscellaneous';
import modules from './modules';
import variables from './variables';

export default [
  ...provider,
  ...datasources,
  ...networking,
  ...security,
  ...compute,
  ...storage,
  ...databases,
  ...loadbalancing,
  ...dns,
  ...monitoring,
  ...miscellaneous,
  ...modules,
  ...variables,
];
