import fs from 'fs';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

/**
 * Parse and initialize metadata.
 * @param {string} providerName - Name of provider.
 * @param {string} metadataPath - Path of metadata file to load.
 * @returns {TerraformMetadata} Initialized metadata.
 */
export function getTerraformMetadata(providerName, metadataPath) {
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  const terraformMetadata = new TerraformMetadata(new TerraformData());
  terraformMetadata.providers = {};
  terraformMetadata.providers[providerName] = metadata;
  return terraformMetadata;
}
