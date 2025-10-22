import React, { useEffect } from 'react';
import { Box, Center, VStack, Heading, Spinner, Text } from '@chakra-ui/react';
import useSlumberlandStore from './store/slumberlandStore';
import DreamCanvas from './components/DreamCanvas/DreamCanvas';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import MarketOpportunityModal from './components/MarketOpportunityModal/MarketOpportunityModal';
import InfluencerDetailModal from './components/InfluencerDetailModal/InfluencerDetailModal';

const LoadingScreen = () => (
  <Center h="100vh" bg="gray.900">
    <VStack spacing={6}>
      <Text fontSize="6xl">💤</Text>
      <Heading size="2xl" bgGradient="linear(to-r, ocean.400, dream.400)" bgClip="text">
        Slumberland
      </Heading>
      <Text color="gray.400">Discovering dream opportunities...</Text>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.700"
        color="ocean.500"
        size="xl"
      />
    </VStack>
  </Center>
);

function App() {
  const { isLoading, setLoading } = useSlumberlandStore();

  useEffect(() => {
    // Simulate loading time to show the beautiful loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden" bg="gray.900">
      <FilterSidebar />
      <DreamCanvas />
      <MarketOpportunityModal />
      <InfluencerDetailModal />
    </Box>
  );
}

export default App;
