import fs from 'fs';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import { DefaultData } from 'leto-modelizer-plugin-core';

export function getTerraformMetadata(metadataName, metadataUrl) {
  const metadata = JSON.parse(fs.readFileSync(metadataUrl, 'utf8'));
  const terraformMetadata = new TerraformMetadata(new DefaultData());
  terraformMetadata.providers = {};
  terraformMetadata.providers[metadataName] = metadata;
  return terraformMetadata;
}
