import provider from 'src/assets/metadata/aws/provider';
import datasources from 'src/assets/metadata/aws/datasources';
import networking from 'src/assets/metadata/aws/networking';
import security from 'src/assets/metadata/aws/security';
import compute from 'src/assets/metadata/aws/compute';
import storage from 'src/assets/metadata/aws/storage';
import databases from 'src/assets/metadata/aws/databases';
import loadbalancing from 'src/assets/metadata/aws/loadbalancing';
import dns from 'src/assets/metadata/aws/dns';
import monitoring from 'src/assets/metadata/aws/monitoring';
import miscellaneous from 'src/assets/metadata/aws/miscellaneous';
import modules from 'src/assets/metadata/aws/modules';
import variables from 'src/assets/metadata/aws/variables';

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
