import fs from 'fs';
import TerraformMetadata from 'src/metadata/TerraformMetadata';

export function getTerraformMetadata(metadataName, metadataUrl) {
  const metadata = JSON.parse(fs.readFileSync(metadataUrl, 'utf8'));
  const terraformMetadata = new TerraformMetadata();
  terraformMetadata.providers = {};
  terraformMetadata.providers[metadataName] = metadata;
  return terraformMetadata;
}