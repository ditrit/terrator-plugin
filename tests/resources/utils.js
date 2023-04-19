import fs from 'fs';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

export function getTerraformMetadata(metadataName, metadataUrl) {
  const metadata = JSON.parse(fs.readFileSync(metadataUrl, 'utf8'));
  const terraformMetadata = new TerraformMetadata(new TerraformData());
  terraformMetadata.providers = {};
  terraformMetadata.providers[metadataName] = metadata;
  return terraformMetadata;
}
