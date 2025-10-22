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
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  List,
  ListItem,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { FiTrendingUp, FiUsers, FiHeart, FiEye } from 'react-icons/fi';
import useSlumberlandStore from '../../store/slumberlandStore';

const InfluencerDetailModal = () => {
  const { selectedInfluencer, setSelectedInfluencer } = useSlumberlandStore();
  const isOpen = selectedInfluencer !== null;

  if (!selectedInfluencer) return null;

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'orange';
    return 'red';
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setSelectedInfluencer(null)} size="6xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" maxW="90vw" maxH="90vh">
        <ModalHeader>
          <HStack spacing={4}>
            <Text fontSize="4xl">{selectedInfluencer.avatar}</Text>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl">{selectedInfluencer.name}</Text>
              <HStack>
                <Text fontSize="sm" color="gray.400">{selectedInfluencer.handle}</Text>
                <Badge colorScheme="dream">{selectedInfluencer.platform}</Badge>
                <Badge colorScheme={getScoreColor(selectedInfluencer.overallScore)} fontSize="md">
                  {selectedInfluencer.overallScore}/100
                </Badge>
              </HStack>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody overflowY="auto">
          <Tabs colorScheme="dream" variant="enclosed">
            <TabList>
              <Tab>📊 Overview</Tab>
              <Tab>👥 Audience</Tab>
              <Tab>🤖 Council Ratings</Tab>
              <Tab>💼 Collaboration</Tab>
            </TabList>

            <TabPanels>
              {/* Overview Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Text fontSize="lg" color="gray.300" mb={4}>{selectedInfluencer.bio}</Text>
                    <HStack spacing={4}>
                      <Badge colorScheme="purple">{selectedInfluencer.niche}</Badge>
                      <Badge colorScheme="blue">{selectedInfluencer.location}</Badge>
                      <Badge colorScheme="green">Age {selectedInfluencer.ageRange}</Badge>
                    </HStack>
                  </Box>

                  <SimpleGrid columns={4} spacing={4}>
                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Followers</StatLabel>
                      <StatNumber fontSize="xl">{selectedInfluencer.followers.toLocaleString()}</StatNumber>
                      <StatHelpText>
                        <FiUsers style={{ display: 'inline' }} /> Total Reach
                      </StatHelpText>
                    </Stat>

                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Engagement</StatLabel>
                      <StatNumber fontSize="xl">{selectedInfluencer.engagement}%</StatNumber>
                      <StatHelpText>
                        <FiHeart style={{ display: 'inline' }} /> Avg Rate
                      </StatHelpText>
                    </Stat>

                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Avg Views</StatLabel>
                      <StatNumber fontSize="xl">{(selectedInfluencer.avgViews / 1000).toFixed(0)}K</StatNumber>
                      <StatHelpText>
                        <FiEye style={{ display: 'inline' }} /> Per Post
                      </StatHelpText>
                    </Stat>

                    <Stat bg="gray.700" p={4} borderRadius="md">
                      <StatLabel>Est. Reach</StatLabel>
                      <StatNumber fontSize="xl">{(selectedInfluencer.estimatedReach / 1000).toFixed(0)}K</StatNumber>
                      <StatHelpText>
                        <FiTrendingUp style={{ display: 'inline' }} /> Per Campaign
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Heading size="md" mb={3}>Content Style</Heading>
                    <HStack spacing={2} wrap="wrap">
                      {selectedInfluencer.contentStyle.map(style => (
                        <Badge key={style} colorScheme="dream" p={2}>{style}</Badge>
                      ))}
                    </HStack>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Top Performing Posts</Heading>
                    <VStack spacing={3}>
                      {selectedInfluencer.topPosts.map((post, i) => (
                        <Box key={i} bg="gray.700" p={4} borderRadius="md" w="full">
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="bold">{post.title}</Text>
                            <Badge colorScheme="green">#{i + 1}</Badge>
                          </HStack>
                          <HStack spacing={4}>
                            <HStack>
                              <FiEye />
                              <Text fontSize="sm">{(post.views / 1000000).toFixed(1)}M views</Text>
                            </HStack>
                            <HStack>
                              <FiHeart />
                              <Text fontSize="sm">{(post.likes / 1000).toFixed(0)}K likes</Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.400">
                              {((post.likes / post.views) * 100).toFixed(1)}% engagement
                            </Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Activity</Heading>
                    <Box bg="gray.700" p={4} borderRadius="md">
                      <HStack justify="space-between">
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.400">Posting Frequency</Text>
                          <Text fontWeight="bold">{selectedInfluencer.postingFrequency}</Text>
                        </VStack>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.400">Brand Partnerships</Text>
                          <Text fontWeight="bold">{selectedInfluencer.brandPartnerships.length} Active</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Previous Brand Partnerships</Heading>
                    <HStack spacing={2}>
                      {selectedInfluencer.brandPartnerships.map(brand => (
                        <Badge key={brand} colorScheme="purple" p={2} fontSize="sm">{brand}</Badge>
                      ))}
                    </HStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Audience Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>Audience Demographics</Heading>

                    <SimpleGrid columns={2} spacing={6}>
                      {/* Age Distribution */}
                      <Box bg="gray.700" p={5} borderRadius="md">
                        <Text fontWeight="bold" mb={3}>Age Distribution</Text>
                        <VStack spacing={3}>
                          {Object.entries(selectedInfluencer.audienceDemographics.age).map(([range, percent]) => (
                            <Box key={range} w="full">
                              <HStack justify="space-between" mb={1}>
                                <Text fontSize="sm">{range}</Text>
                                <Text fontSize="sm" fontWeight="bold">{percent}%</Text>
                              </HStack>
                              <Progress value={percent} colorScheme="dream" size="sm" />
                            </Box>
                          ))}
                        </VStack>
                      </Box>

                      {/* Gender Distribution */}
                      <Box bg="gray.700" p={5} borderRadius="md">
                        <Text fontWeight="bold" mb={3}>Gender Distribution</Text>
                        <VStack spacing={3}>
                          {Object.entries(selectedInfluencer.audienceDemographics.gender).map(([gender, percent]) => (
                            <Box key={gender} w="full">
                              <HStack justify="space-between" mb={1}>
                                <Text fontSize="sm" textTransform="capitalize">{gender}</Text>
                                <Text fontSize="sm" fontWeight="bold">{percent}%</Text>
                              </HStack>
                              <Progress value={percent} colorScheme="purple" size="sm" />
                            </Box>
                          ))}
                        </VStack>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Top Locations</Heading>
                    <SimpleGrid columns={4} spacing={3}>
                      {selectedInfluencer.audienceDemographics.topLocations.map((location, i) => (
                        <Box key={location} bg="gray.700" p={4} borderRadius="md" textAlign="center">
                          <Text fontSize="2xl" mb={1}>🌍</Text>
                          <Text fontSize="sm" fontWeight="bold">{location}</Text>
                          <Badge colorScheme="dream" mt={1}>#{i + 1}</Badge>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Audience Insights</Heading>
                    <SimpleGrid columns={2} spacing={4}>
                      <Box bg="blue.900" p={5} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>💰 Purchase Intent</Text>
                        <Progress value={78} colorScheme="blue" mb={2} />
                        <Text fontSize="xs" color="gray.300">
                          High engagement on product recommendations and reviews
                        </Text>
                      </Box>

                      <Box bg="green.900" p={5} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>🎯 Brand Affinity</Text>
                        <Progress value={85} colorScheme="green" mb={2} />
                        <Text fontSize="xs" color="gray.300">
                          Strong trust in creator's product endorsements
                        </Text>
                      </Box>

                      <Box bg="purple.900" p={5} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>📱 Platform Loyalty</Text>
                        <Progress value={92} colorScheme="purple" mb={2} />
                        <Text fontSize="xs" color="gray.300">
                          Highly engaged daily active users
                        </Text>
                      </Box>

                      <Box bg="orange.900" p={5} borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={2}>🗣️ Community Strength</Text>
                        <Progress value={88} colorScheme="orange" mb={2} />
                        <Text fontSize="xs" color="gray.300">
                          Active comment participation and sharing
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box bg="dream.900" p={5} borderRadius="md">
                    <Heading size="sm" mb={3}>💡 Audience Match Analysis</Heading>
                    <Text fontSize="sm" color="gray.200">
                      This creator's audience shows exceptional alignment with your target demographic.
                      The {selectedInfluencer.audienceDemographics.age['25-34']}% of followers in the 25-34 age range
                      represents your core market, and the {selectedInfluencer.engagement}% engagement rate indicates
                      a highly active and responsive community.
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Council Ratings Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>AI Council Breakdown</Heading>
                    <Text fontSize="sm" color="gray.400" mb={4}>
                      Four specialized AI agents independently evaluated this creator. Here's their detailed analysis:
                    </Text>
                  </Box>

                  {/* Musical DNA Agent */}
                  <Box bg="purple.900" p={6} borderRadius="md">
                    <HStack justify="space-between" mb={3}>
                      <HStack>
                        <Text fontSize="2xl">🎵</Text>
                        <Heading size="sm">Musical DNA Agent</Heading>
                      </HStack>
                      <Badge colorScheme={getScoreColor(selectedInfluencer.councilRatings.musicalDNA.score)} fontSize="lg">
                        {selectedInfluencer.councilRatings.musicalDNA.score}/100
                      </Badge>
                    </HStack>
                    <Progress
                      value={selectedInfluencer.councilRatings.musicalDNA.score}
                      colorScheme="purple"
                      mb={3}
                      size="lg"
                    />
                    <Box bg="purple.800" p={4} borderRadius="md">
                      <Text fontSize="sm" fontWeight="bold" mb={2}>Reasoning:</Text>
                      <Text fontSize="sm" color="gray.200">
                        {selectedInfluencer.councilRatings.musicalDNA.reasoning}
                      </Text>
                    </Box>
                  </Box>

                  {/* Vibe Check Agent */}
                  <Box bg="blue.900" p={6} borderRadius="md">
                    <HStack justify="space-between" mb={3}>
                      <HStack>
                        <Text fontSize="2xl">✨</Text>
                        <Heading size="sm">Vibe Check Agent</Heading>
                      </HStack>
                      <Badge colorScheme={getScoreColor(selectedInfluencer.councilRatings.vibeCheck.score)} fontSize="lg">
                        {selectedInfluencer.councilRatings.vibeCheck.score}/100
                      </Badge>
                    </HStack>
                    <Progress
                      value={selectedInfluencer.councilRatings.vibeCheck.score}
                      colorScheme="blue"
                      mb={3}
                      size="lg"
                    />
                    <Box bg="blue.800" p={4} borderRadius="md">
                      <Text fontSize="sm" fontWeight="bold" mb={2}>Reasoning:</Text>
                      <Text fontSize="sm" color="gray.200">
                        {selectedInfluencer.councilRatings.vibeCheck.reasoning}
                      </Text>
                    </Box>
                  </Box>

                  {/* Audience Intel Agent */}
                  <Box bg="green.900" p={6} borderRadius="md">
                    <HStack justify="space-between" mb={3}>
                      <HStack>
                        <Text fontSize="2xl">👥</Text>
                        <Heading size="sm">Audience Intel Agent</Heading>
                      </HStack>
                      <Badge colorScheme={getScoreColor(selectedInfluencer.councilRatings.audienceIntel.score)} fontSize="lg">
                        {selectedInfluencer.councilRatings.audienceIntel.score}/100
                      </Badge>
                    </HStack>
                    <Progress
                      value={selectedInfluencer.councilRatings.audienceIntel.score}
                      colorScheme="green"
                      mb={3}
                      size="lg"
                    />
                    <Box bg="green.800" p={4} borderRadius="md">
                      <Text fontSize="sm" fontWeight="bold" mb={2}>Reasoning:</Text>
                      <Text fontSize="sm" color="gray.200">
                        {selectedInfluencer.councilRatings.audienceIntel.reasoning}
                      </Text>
                    </Box>
                  </Box>

                  {/* Trendmaster Agent */}
                  <Box bg="orange.900" p={6} borderRadius="md">
                    <HStack justify="space-between" mb={3}>
                      <HStack>
                        <Text fontSize="2xl">📈</Text>
                        <Heading size="sm">Trendmaster Agent</Heading>
                      </HStack>
                      <Badge colorScheme={getScoreColor(selectedInfluencer.councilRatings.trendmaster.score)} fontSize="lg">
                        {selectedInfluencer.councilRatings.trendmaster.score}/100
                      </Badge>
                    </HStack>
                    <Progress
                      value={selectedInfluencer.councilRatings.trendmaster.score}
                      colorScheme="orange"
                      mb={3}
                      size="lg"
                    />
                    <Box bg="orange.800" p={4} borderRadius="md">
                      <Text fontSize="sm" fontWeight="bold" mb={2}>Reasoning:</Text>
                      <Text fontSize="sm" color="gray.200">
                        {selectedInfluencer.councilRatings.trendmaster.reasoning}
                      </Text>
                    </Box>
                  </Box>

                  {/* Overall Consensus */}
                  <Box bg="gray.700" p={6} borderRadius="md">
                    <Heading size="sm" mb={3}>🎯 Final Consensus</Heading>
                    <HStack spacing={6} mb={4}>
                      <VStack>
                        <Text fontSize="3xl" fontWeight="bold" color="dream.400">
                          {selectedInfluencer.overallScore}
                        </Text>
                        <Text fontSize="xs" color="gray.400">Overall Score</Text>
                      </VStack>
                      <Divider orientation="vertical" h="60px" />
                      <VStack align="start" flex={1}>
                        <Text fontSize="sm" color="gray.200">
                          Based on weighted analysis from all four agents, this creator represents a{' '}
                          <Text as="span" fontWeight="bold" color={
                            selectedInfluencer.overallScore >= 90 ? 'green.400' :
                            selectedInfluencer.overallScore >= 80 ? 'blue.400' : 'orange.400'
                          }>
                            {selectedInfluencer.overallScore >= 90 ? 'exceptional' :
                             selectedInfluencer.overallScore >= 80 ? 'strong' : 'moderate'}
                          </Text>
                          {' '}match for your campaign goals.
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Collaboration Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={3}>Partnership Details</Heading>

                    <SimpleGrid columns={2} spacing={4}>
                      <Box bg="gray.700" p={5} borderRadius="md">
                        <Text fontSize="sm" color="gray.400" mb={1}>Estimated Cost</Text>
                        <Text fontSize="xl" fontWeight="bold">{selectedInfluencer.costEstimate}</Text>
                      </Box>

                      <Box bg="gray.700" p={5} borderRadius="md">
                        <Text fontSize="sm" color="gray.400" mb={1}>Estimated Reach</Text>
                        <Text fontSize="xl" fontWeight="bold">
                          {selectedInfluencer.estimatedReach.toLocaleString()} people
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Collaboration Ideas</Heading>
                    <VStack spacing={3}>
                      {selectedInfluencer.collaborationIdeas.map((idea, i) => (
                        <Box key={i} bg="dream.900" p={4} borderRadius="md" w="full">
                          <HStack>
                            <Badge colorScheme="dream">Idea {i + 1}</Badge>
                            <Text>{idea}</Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Recommended Content Types</Heading>
                    <SimpleGrid columns={2} spacing={4}>
                      {selectedInfluencer.contentStyle.slice(0, 4).map(style => (
                        <Box key={style} bg="gray.700" p={4} borderRadius="md">
                          <HStack>
                            <Text fontSize="2xl">📹</Text>
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="bold">{style}</Text>
                              <Text fontSize="xs" color="gray.400">High engagement format</Text>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Expected Deliverables</Heading>
                    <Box bg="gray.700" p={5} borderRadius="md">
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th color="gray.400">Deliverable</Th>
                            <Th color="gray.400">Quantity</Th>
                            <Th color="gray.400">Timeline</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Primary Content Piece</Td>
                            <Td>1-2 posts</Td>
                            <Td>Week 1-2</Td>
                          </Tr>
                          <Tr>
                            <Td>Story/Short-form Content</Td>
                            <Td>3-5 pieces</Td>
                            <Td>Week 1-3</Td>
                          </Tr>
                          <Tr>
                            <Td>Community Engagement</Td>
                            <Td>Q&A or Live</Td>
                            <Td>Week 2-3</Td>
                          </Tr>
                          <Tr>
                            <Td>Performance Report</Td>
                            <Td>1 report</Td>
                            <Td>Week 4</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </Box>
                  </Box>

                  <Box bg="ocean.900" p={6} borderRadius="md">
                    <Heading size="sm" mb={3}>💡 Next Steps</Heading>
                    <List spacing={2}>
                      <ListItem fontSize="sm">
                        1. Review the collaboration ideas above and select your preferred approach
                      </ListItem>
                      <ListItem fontSize="sm">
                        2. Prepare a brief outlining your campaign goals and key messages
                      </ListItem>
                      <ListItem fontSize="sm">
                        3. Reach out via {selectedInfluencer.platform} DM or business email
                      </ListItem>
                      <ListItem fontSize="sm">
                        4. Reference their work with {selectedInfluencer.brandPartnerships[0]} as an example
                      </ListItem>
                      <ListItem fontSize="sm">
                        5. Propose a discovery call to discuss partnership details
                      </ListItem>
                    </List>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => setSelectedInfluencer(null)}>
            Close
          </Button>
          <Button colorScheme="dream">Contact Creator</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfluencerDetailModal;
