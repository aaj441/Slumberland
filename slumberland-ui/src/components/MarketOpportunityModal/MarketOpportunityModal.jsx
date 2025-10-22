import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Heading,
  Progress,
  List,
  ListItem,
  ListIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Checkbox
} from '@chakra-ui/react';
import { FiCheckCircle, FiTrendingUp, FiUsers, FiTarget, FiDollarSign } from 'react-icons/fi';
import useSlumberlandStore from '../../store/slumberlandStore';

const MarketOpportunityModal = () => {
  const { selectedMarket, setSelectedMarket, getInfluencerById } = useSlumberlandStore();
  const isOpen = selectedMarket !== null;

  if (!selectedMarket) return null;

  const matchedInfluencers = selectedMarket.matchedInfluencers
    .map(id => getInfluencerById(id))
    .filter(Boolean);

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'orange';
    return 'red';
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setSelectedMarket(null)} size="6xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" maxW="90vw" maxH="90vh">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack>
              <Text fontSize="2xl">🌊 {selectedMarket.name}</Text>
              <Badge colorScheme={getScoreColor(selectedMarket.opportunityScore)} fontSize="lg">
                {selectedMarket.opportunityScore}% Opportunity
              </Badge>
              {selectedMarket.blueOcean && (
                <Badge colorScheme="ocean">Blue Ocean</Badge>
              )}
            </HStack>
            <Text fontSize="sm" color="gray.400">
              {selectedMarket.category} • {selectedMarket.marketSize} Market
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody overflowY="auto">
          <Tabs colorScheme="ocean" variant="enclosed">
            <TabList>
              <Tab>📊 Overview</Tab>
              <Tab>💡 Insights</Tab>
              <Tab>🎯 Target Audience</Tab>
              <Tab>⭐ Matched Influencers</Tab>
              <Tab>✅ Action Plan</Tab>
            </TabList>

            <TabPanels>
              {/* Overview Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>Market Overview</Heading>
                    <Text color="gray.300">{selectedMarket.description}</Text>
                  </Box>

                  <SimpleGrid columns={3} spacing={4}>
                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Market Size</StatLabel>
                      <StatNumber>{selectedMarket.marketSize}</StatNumber>
                      <StatHelpText>
                        <FiDollarSign style={{ display: 'inline' }} /> Total Addressable
                      </StatHelpText>
                    </Stat>

                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Growth Rate</StatLabel>
                      <StatNumber>{selectedMarket.growthRate}</StatNumber>
                      <StatHelpText>
                        <FiTrendingUp style={{ display: 'inline' }} /> Year over Year
                      </StatHelpText>
                    </Stat>

                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Competition</StatLabel>
                      <StatNumber>{selectedMarket.competition}</StatNumber>
                      <StatHelpText>
                        <FiUsers style={{ display: 'inline' }} /> Market Saturation
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Heading size="md" mb={3}>Trend Analysis</Heading>
                    <Box bg="gray.700" p={4} borderRadius="md">
                      <HStack justify="space-between" mb={2}>
                        {selectedMarket.trendData.map((point, i) => (
                          <VStack key={i} spacing={1}>
                            <Text fontSize="xs" color="gray.400">{point.month}</Text>
                            <Box
                              height={`${point.interest}px`}
                              width="40px"
                              bg="ocean.500"
                              borderRadius="sm"
                            />
                            <Text fontSize="xs" fontWeight="bold">{point.interest}</Text>
                          </VStack>
                        ))}
                      </HStack>
                      <Text fontSize="xs" color="gray.400" textAlign="center" mt={2}>
                        Search Interest Over Time (Indexed)
                      </Text>
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Opportunity Breakdown</Heading>
                    <VStack spacing={3}>
                      <Box w="full">
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm">Market Demand</Text>
                          <Text fontSize="sm" fontWeight="bold">95%</Text>
                        </HStack>
                        <Progress value={95} colorScheme="green" size="sm" />
                      </Box>
                      <Box w="full">
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm">Low Competition</Text>
                          <Text fontSize="sm" fontWeight="bold">88%</Text>
                        </HStack>
                        <Progress value={88} colorScheme="blue" size="sm" />
                      </Box>
                      <Box w="full">
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm">Growth Momentum</Text>
                          <Text fontSize="sm" fontWeight="bold">94%</Text>
                        </HStack>
                        <Progress value={94} colorScheme="purple" size="sm" />
                      </Box>
                      <Box w="full">
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm">Influencer Availability</Text>
                          <Text fontSize="sm" fontWeight="bold">91%</Text>
                        </HStack>
                        <Progress value={91} colorScheme="ocean" size="sm" />
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Insights Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>Key Market Insights</Heading>
                    <List spacing={3}>
                      {selectedMarket.keyInsights.map((insight, i) => (
                        <ListItem key={i} display="flex" alignItems="start">
                          <ListIcon as={FiCheckCircle} color="ocean.500" mt={1} />
                          <Text color="gray.300">{insight}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Pain Points to Address</Heading>
                    <SimpleGrid columns={2} spacing={4}>
                      {selectedMarket.painPoints.map((pain, i) => (
                        <Box key={i} bg="red.900" p={4} borderRadius="md">
                          <HStack>
                            <Text fontSize="2xl">⚠️</Text>
                            <Text fontSize="sm">{pain}</Text>
                          </HStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Box bg="ocean.900" p={6} borderRadius="md">
                    <Heading size="sm" mb={3}>💡 Strategic Recommendation</Heading>
                    <Text color="gray.200">
                      This market shows exceptional potential due to {selectedMarket.blueOcean ? 'low competition (Blue Ocean opportunity)' : 'strong fundamentals'} and high growth momentum.
                      Focus on addressing the key pain points through influencer partnerships that emphasize authenticity and education.
                      The {matchedInfluencers.length} matched influencers have audiences that align perfectly with your target demographic.
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Target Audience Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>Target Audience Profile</Heading>
                    <Box bg="gray.700" p={6} borderRadius="md">
                      <HStack spacing={3} mb={4}>
                        <FiTarget size={24} color="#00bcd4" />
                        <Text fontSize="lg" fontWeight="bold">{selectedMarket.targetAudience}</Text>
                      </HStack>
                      <Text color="gray.300">{selectedMarket.description}</Text>
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Audience Characteristics</Heading>
                    <SimpleGrid columns={2} spacing={4}>
                      <Box bg="purple.900" p={4} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>Demographics</Text>
                        <List spacing={1}>
                          <ListItem fontSize="xs">• Age: 22-34 (primary)</ListItem>
                          <ListItem fontSize="xs">• Income: $40k-$80k</ListItem>
                          <ListItem fontSize="xs">• Education: College+</ListItem>
                          <ListItem fontSize="xs">• Urban/Suburban</ListItem>
                        </List>
                      </Box>

                      <Box bg="blue.900" p={4} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>Psychographics</Text>
                        <List spacing={1}>
                          <ListItem fontSize="xs">• Early adopters</ListItem>
                          <ListItem fontSize="xs">• Tech-savvy</ListItem>
                          <ListItem fontSize="xs">• Value innovation</ListItem>
                          <ListItem fontSize="xs">• Community-driven</ListItem>
                        </List>
                      </Box>

                      <Box bg="green.900" p={4} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>Behaviors</Text>
                        <List spacing={1}>
                          <ListItem fontSize="xs">• Active on social media</ListItem>
                          <ListItem fontSize="xs">• Follows influencers</ListItem>
                          <ListItem fontSize="xs">• Researches before buying</ListItem>
                          <ListItem fontSize="xs">• Values authenticity</ListItem>
                        </List>
                      </Box>

                      <Box bg="orange.900" p={4} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>Purchase Triggers</Text>
                        <List spacing={1}>
                          <ListItem fontSize="xs">• Social proof</ListItem>
                          <ListItem fontSize="xs">• Creator recommendations</ListItem>
                          <ListItem fontSize="xs">• Educational content</ListItem>
                          <ListItem fontSize="xs">• Limited-time offers</ListItem>
                        </List>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Content Preferences</Heading>
                    <HStack spacing={4} wrap="wrap">
                      <Badge colorScheme="ocean" p={2}>Tutorial Videos</Badge>
                      <Badge colorScheme="ocean" p={2}>Behind-the-Scenes</Badge>
                      <Badge colorScheme="ocean" p={2}>Product Reviews</Badge>
                      <Badge colorScheme="ocean" p={2}>Live Streams</Badge>
                      <Badge colorScheme="ocean" p={2}>Short-Form (TikTok/Reels)</Badge>
                      <Badge colorScheme="ocean" p={2}>Community Challenges</Badge>
                    </HStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Matched Influencers Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Matched Influencers ({matchedInfluencers.length})</Heading>
                  <Text fontSize="sm" color="gray.400">
                    These creators have been matched based on audience alignment, content fit, and AI council scoring.
                  </Text>

                  {matchedInfluencers.map(influencer => (
                    <Box key={influencer.id} bg="gray.700" p={5} borderRadius="md">
                      <HStack justify="space-between" mb={3}>
                        <HStack>
                          <Text fontSize="3xl">{influencer.avatar}</Text>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{influencer.name}</Text>
                            <Text fontSize="sm" color="gray.400">{influencer.handle}</Text>
                          </VStack>
                        </HStack>
                        <Badge colorScheme={getScoreColor(influencer.overallScore)} fontSize="lg">
                          {influencer.overallScore}/100
                        </Badge>
                      </HStack>

                      <SimpleGrid columns={4} spacing={3} mb={3}>
                        <Box>
                          <Text fontSize="xs" color="gray.400">Platform</Text>
                          <Text fontSize="sm" fontWeight="bold">{influencer.platform}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.400">Followers</Text>
                          <Text fontSize="sm" fontWeight="bold">{influencer.followers.toLocaleString()}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.400">Engagement</Text>
                          <Text fontSize="sm" fontWeight="bold">{influencer.engagement}%</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.400">Est. Cost</Text>
                          <Text fontSize="sm" fontWeight="bold">{influencer.costEstimate.split(' ')[0]}</Text>
                        </Box>
                      </SimpleGrid>

                      <Text fontSize="sm" color="gray.300" mb={2}>{influencer.bio}</Text>

                      <HStack spacing={2}>
                        <Badge colorScheme="purple">Musical DNA: {influencer.councilRatings.musicalDNA.score}</Badge>
                        <Badge colorScheme="blue">Vibe: {influencer.councilRatings.vibeCheck.score}</Badge>
                        <Badge colorScheme="green">Audience: {influencer.councilRatings.audienceIntel.score}</Badge>
                        <Badge colorScheme="orange">Trends: {influencer.councilRatings.trendmaster.score}</Badge>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>

              {/* Action Plan Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>Campaign Action Plan</Heading>
                    <Text fontSize="sm" color="gray.400" mb={4}>
                      Track your progress as you execute this market opportunity.
                    </Text>

                    <VStack spacing={3} align="stretch">
                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Research Competition</Text>
                            <Text fontSize="sm" color="gray.400">Analyze existing players and their positioning</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Define Value Proposition</Text>
                            <Text fontSize="sm" color="gray.400">Clarify unique benefits and differentiation</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Reach Out to Top 3 Influencers</Text>
                            <Text fontSize="sm" color="gray.400">Contact {matchedInfluencers.slice(0, 3).map(i => i.name.split(' ')[0]).join(', ')}</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Create Content Brief</Text>
                            <Text fontSize="sm" color="gray.400">Develop collaboration guidelines and talking points</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Set Success Metrics</Text>
                            <Text fontSize="sm" color="gray.400">Define KPIs: reach, engagement, conversions</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Negotiate Partnerships</Text>
                            <Text fontSize="sm" color="gray.400">Discuss terms, deliverables, and compensation</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Launch Campaign</Text>
                            <Text fontSize="sm" color="gray.400">Coordinate content release and promotion</Text>
                          </VStack>
                        </Checkbox>
                      </Box>

                      <Box bg="gray.700" p={4} borderRadius="md">
                        <Checkbox size="lg" colorScheme="ocean">
                          <VStack align="start" spacing={1} ml={2}>
                            <Text fontWeight="bold">Monitor & Optimize</Text>
                            <Text fontSize="sm" color="gray.400">Track performance and adjust strategy</Text>
                          </VStack>
                        </Checkbox>
                      </Box>
                    </VStack>
                  </Box>

                  <Box bg="ocean.900" p={4} borderRadius="md">
                    <Text fontSize="sm" fontWeight="bold" mb={2}>💡 Quick Win</Text>
                    <Text fontSize="sm">
                      Start by reaching out to {matchedInfluencers[0]?.name} - they have the highest match score
                      and their audience perfectly aligns with this market opportunity.
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => setSelectedMarket(null)}>
            Close
          </Button>
          <Button colorScheme="ocean">Export Report</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MarketOpportunityModal;
