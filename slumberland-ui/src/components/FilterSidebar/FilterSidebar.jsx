import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Divider,
  Badge,
  Button
} from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import useSlumberlandStore from '../../store/slumberlandStore';

const FilterSidebar = () => {
  const { filters, updateFilters, resetFilters, markets, influencers } = useSlumberlandStore();

  const categories = [...new Set(markets.map(m => m.category))];
  const platforms = [...new Set(influencers.map(i => i.platform))];
  const niches = [...new Set(influencers.map(i => i.niche))];

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width="350px"
      bg="gray.800"
      borderRight="1px solid"
      borderColor="gray.700"
      overflowY="auto"
      zIndex={10}
    >
      <VStack spacing={4} p={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" mb={2} display="flex" alignItems="center" gap={2}>
            💤 Slumberland
          </Heading>
          <Text fontSize="sm" color="gray.400">
            AI-Powered Market Discovery
          </Text>
        </Box>

        <Divider />

        {/* Reset Filters Button */}
        <Button
          leftIcon={<FiRefreshCw />}
          size="sm"
          variant="outline"
          colorScheme="ocean"
          onClick={resetFilters}
        >
          Reset All Filters
        </Button>

        {/* Tabs */}
        <Tabs colorScheme="ocean" variant="soft-rounded">
          <TabList>
            <Tab fontSize="sm">🌊 Markets</Tab>
            <Tab fontSize="sm">⭐ Creators</Tab>
            <Tab fontSize="sm">🤖 AI Agents</Tab>
          </TabList>

          <TabPanels>
            {/* Markets Tab */}
            <TabPanel px={0}>
              <VStack spacing={6} align="stretch">
                {/* Blue Ocean Filter */}
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="blue-ocean" mb="0" flex={1}>
                    Blue Ocean Only
                  </FormLabel>
                  <Switch
                    id="blue-ocean"
                    colorScheme="ocean"
                    isChecked={filters.blueOceanOnly}
                    onChange={(e) => updateFilters({ blueOceanOnly: e.target.checked })}
                  />
                </FormControl>

                {/* Opportunity Score */}
                <FormControl>
                  <FormLabel>
                    Min Opportunity Score
                    <Badge ml={2} colorScheme="ocean">{filters.minOpportunityScore}%</Badge>
                  </FormLabel>
                  <Slider
                    value={filters.minOpportunityScore}
                    onChange={(val) => updateFilters({ minOpportunityScore: val })}
                    min={0}
                    max={100}
                    step={5}
                    colorScheme="ocean"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>

                {/* Categories */}
                <FormControl>
                  <FormLabel>Categories</FormLabel>
                  <CheckboxGroup
                    value={filters.selectedCategories}
                    onChange={(values) => updateFilters({ selectedCategories: values })}
                  >
                    <Stack spacing={2}>
                      {categories.map(category => (
                        <Checkbox key={category} value={category} colorScheme="ocean">
                          <Text fontSize="sm">{category}</Text>
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </FormControl>

                {/* Market Stats */}
                <Box bg="gray.700" p={4} borderRadius="md">
                  <Text fontSize="sm" fontWeight="bold" mb={2}>Market Stats</Text>
                  <VStack spacing={1} align="stretch">
                    <Text fontSize="xs" color="gray.300">
                      Total Markets: <Badge colorScheme="ocean">{markets.length}</Badge>
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      Blue Ocean: <Badge colorScheme="ocean">
                        {markets.filter(m => m.blueOcean).length}
                      </Badge>
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      Avg Score: <Badge colorScheme="ocean">
                        {Math.round(markets.reduce((sum, m) => sum + m.opportunityScore, 0) / markets.length)}%
                      </Badge>
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* Creators Tab */}
            <TabPanel px={0}>
              <VStack spacing={6} align="stretch">
                {/* Platforms */}
                <FormControl>
                  <FormLabel>Platforms</FormLabel>
                  <CheckboxGroup
                    value={filters.selectedPlatforms}
                    onChange={(values) => updateFilters({ selectedPlatforms: values })}
                  >
                    <Stack spacing={2}>
                      {platforms.map(platform => (
                        <Checkbox key={platform} value={platform} colorScheme="dream">
                          <Text fontSize="sm">{platform}</Text>
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </FormControl>

                {/* Min Followers */}
                <FormControl>
                  <FormLabel>
                    Min Followers
                    <Badge ml={2} colorScheme="dream">
                      {filters.minFollowers.toLocaleString()}
                    </Badge>
                  </FormLabel>
                  <Slider
                    value={filters.minFollowers}
                    onChange={(val) => updateFilters({ minFollowers: val })}
                    min={0}
                    max={500000}
                    step={10000}
                    colorScheme="dream"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>

                {/* Min Engagement */}
                <FormControl>
                  <FormLabel>
                    Min Engagement Rate
                    <Badge ml={2} colorScheme="dream">{filters.minEngagement}%</Badge>
                  </FormLabel>
                  <Slider
                    value={filters.minEngagement}
                    onChange={(val) => updateFilters({ minEngagement: val })}
                    min={0}
                    max={15}
                    step={0.5}
                    colorScheme="dream"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>

                {/* Niches */}
                <FormControl>
                  <FormLabel>Niches</FormLabel>
                  <CheckboxGroup
                    value={filters.selectedNiches}
                    onChange={(values) => updateFilters({ selectedNiches: values })}
                  >
                    <Stack spacing={2}>
                      {niches.map(niche => (
                        <Checkbox key={niche} value={niche} colorScheme="dream">
                          <Text fontSize="sm">{niche}</Text>
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </FormControl>

                {/* Creator Stats */}
                <Box bg="gray.700" p={4} borderRadius="md">
                  <Text fontSize="sm" fontWeight="bold" mb={2}>Creator Stats</Text>
                  <VStack spacing={1} align="stretch">
                    <Text fontSize="xs" color="gray.300">
                      Total Creators: <Badge colorScheme="dream">{influencers.length}</Badge>
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      Avg Score: <Badge colorScheme="dream">
                        {Math.round(influencers.reduce((sum, i) => sum + i.overallScore, 0) / influencers.length)}
                      </Badge>
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      Total Reach: <Badge colorScheme="dream">
                        {(influencers.reduce((sum, i) => sum + i.followers, 0) / 1000000).toFixed(1)}M
                      </Badge>
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* AI Agents Tab */}
            <TabPanel px={0}>
              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" color="gray.300">
                  Meet the 4-agent AI council that powers Slumberland:
                </Text>

                {/* Musical DNA Agent */}
                <Box bg="purple.900" p={4} borderRadius="md">
                  <Heading size="sm" mb={2}>🎵 Musical DNA</Heading>
                  <Text fontSize="xs" color="gray.300">
                    Analyzes your Last.fm listening history to find creators who match your musical taste.
                  </Text>
                  <Badge mt={2} colorScheme="purple">Last.fm Integration</Badge>
                </Box>

                {/* Vibe Check Agent */}
                <Box bg="blue.900" p={4} borderRadius="md">
                  <Heading size="sm" mb={2}>✨ Vibe Check</Heading>
                  <Text fontSize="xs" color="gray.300">
                    Evaluates creator authenticity, values alignment, and community sentiment.
                  </Text>
                  <Badge mt={2} colorScheme="blue">Sentiment Analysis</Badge>
                </Box>

                {/* Audience Intel Agent */}
                <Box bg="green.900" p={4} borderRadius="md">
                  <Heading size="sm" mb={2}>👥 Audience Intel</Heading>
                  <Text fontSize="xs" color="gray.300">
                    Deep demographic analysis and purchase intent scoring of creator audiences.
                  </Text>
                  <Badge mt={2} colorScheme="green">Demographics AI</Badge>
                </Box>

                {/* Trendmaster Agent */}
                <Box bg="orange.900" p={4} borderRadius="md">
                  <Heading size="sm" mb={2}>📈 Trendmaster</Heading>
                  <Text fontSize="xs" color="gray.300">
                    Identifies emerging trends and momentum patterns before they go mainstream.
                  </Text>
                  <Badge mt={2} colorScheme="orange">Predictive Analytics</Badge>
                </Box>

                <Divider />

                {/* Council Info */}
                <Box bg="gray.700" p={4} borderRadius="md">
                  <Text fontSize="sm" fontWeight="bold" mb={2}>How It Works</Text>
                  <VStack spacing={2} align="stretch">
                    <Text fontSize="xs" color="gray.300">
                      1️⃣ Each agent scores opportunities independently
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      2️⃣ Scores are weighted by confidence levels
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      3️⃣ Final consensus score combines all perspectives
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      4️⃣ You see the full reasoning breakdown
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Legend */}
        <Box bg="gray.700" p={4} borderRadius="md" mt={4}>
          <Text fontSize="sm" fontWeight="bold" mb={3}>Graph Legend</Text>
          <VStack spacing={2} align="stretch">
            <Box display="flex" alignItems="center" gap={2}>
              <Box w="20px" h="20px" borderRadius="full" bg="ocean.500" />
              <Text fontSize="xs">Market Opportunities</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Box w="20px" h="20px" borderRadius="full" bg="dream.500" />
              <Text fontSize="xs">Influencers</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Box w="15px" h="15px" borderRadius="full" bg="success.500" />
              <Text fontSize="xs">Score 90+ (Excellent)</Text>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Box w="15px" h="15px" borderRadius="full" bg="blue.500" />
              <Text fontSize="xs">Score 80-89 (Good)</Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default FilterSidebar;
