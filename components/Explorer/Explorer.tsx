import { Flex, Loader, Paper, SimpleGrid, Text } from '@mantine/core';
import { Asset } from '@metaplex-foundation/mpl-core';
import { ExplorerAssetDetails } from './ExplorerAssetDetails';
import { ExplorerPluginDetails } from './ExplorerPluginDetails';
import { useFetchCollection } from '@/hooks/fetch';

const CollectionPluginDetails = ({ mint }: { mint: string }) => {
  const { isLoading, isError, data: collection } = useFetchCollection(mint);
  return (
    <>
      {isLoading && <Loader />}
      {isError && <Text>Error fetching collection</Text>}
      {collection && <ExplorerPluginDetails plugins={collection} type="collection" />}
    </>
  );
};

export function Explorer({ asset }: { asset: Asset }) {
  return (
    <SimpleGrid cols={2} mt="xl" spacing="lg" pb="xl">
      <Paper p="xl" radius="md">
        <ExplorerAssetDetails asset={asset} />
      </Paper>
      <Flex direction="column">
        <Paper p="xl" radius="md">
          <ExplorerPluginDetails plugins={asset} type="asset" />
        </Paper>

        {asset.updateAuthority.__kind === 'Collection' && (
        <Paper
          p="xl"
          radius="md"
          mt="lg"
          style={{
          flexGrow: 1,
        }}
        >
          <CollectionPluginDetails mint={asset.updateAuthority.fields[0]} />
        </Paper>
        )}
      </Flex>
    </SimpleGrid>
  );
}
