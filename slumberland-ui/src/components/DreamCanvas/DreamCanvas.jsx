import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';
import useSlumberlandStore from '../../store/slumberlandStore';

const DreamCanvas = () => {
  const svgRef = useRef();
  const {
    getFilteredMarkets,
    getFilteredInfluencers,
    setSelectedMarket,
    setSelectedInfluencer
  } = useSlumberlandStore();

  useEffect(() => {
    const markets = getFilteredMarkets();
    const influencers = getFilteredInfluencers();

    // Clear existing SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const width = window.innerWidth - 350; // Account for sidebar
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create container group for zoom
    const g = svg.append('g');

    // Prepare nodes and links
    const nodes = [
      { id: 'center', type: 'center', name: 'Slumberland', x: width / 2, y: height / 2, fixed: true },
      ...markets.map(m => ({
        id: m.id,
        type: 'market',
        name: m.name,
        data: m,
        score: m.opportunityScore
      })),
      ...influencers.map(inf => ({
        id: inf.id,
        type: 'influencer',
        name: inf.name,
        data: inf,
        score: inf.overallScore
      }))
    ];

    const links = [];

    // Connect markets to center
    markets.forEach(m => {
      links.push({ source: 'center', target: m.id, type: 'market-link' });
    });

    // Connect influencers to their matched markets
    influencers.forEach(inf => {
      markets.forEach(market => {
        if (market.matchedInfluencers.includes(inf.id)) {
          links.push({ source: market.id, target: inf.id, type: 'influencer-link' });
        }
      });
    });

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(d => {
        if (d.type === 'market-link') return 200;
        return 150;
      }))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => d.type === 'market-link' ? '#00bcd4' : '#9c27b0')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 2);

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => {
        if (d.type === 'center') return 40;
        if (d.type === 'market') return 30;
        return 25;
      })
      .attr('fill', d => {
        if (d.type === 'center') return '#ffffff';
        if (d.type === 'market') return '#00bcd4';
        return '#9c27b0';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', d => d.type !== 'center' ? 'pointer' : 'default')
      .on('mouseover', function(event, d) {
        if (d.type !== 'center') {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.type === 'market' ? 35 : 30)
            .attr('stroke-width', 4);
        }
      })
      .on('mouseout', function(event, d) {
        if (d.type !== 'center') {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.type === 'market' ? 30 : 25)
            .attr('stroke-width', 2);
        }
      })
      .on('click', function(event, d) {
        if (d.type === 'market') {
          setSelectedMarket(d.data);
        } else if (d.type === 'influencer') {
          setSelectedInfluencer(d.data);
        }
      });

    // Add icons to nodes
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', d => {
        if (d.type === 'center') return '24px';
        if (d.type === 'market') return '20px';
        return '18px';
      })
      .style('pointer-events', 'none')
      .text(d => {
        if (d.type === 'center') return '💤';
        if (d.type === 'market') return '🌊';
        return d.data.avatar || '⭐';
      });

    // Add labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.type === 'center' ? 55 : 45)
      .attr('font-size', d => d.type === 'center' ? '18px' : '12px')
      .attr('fill', '#ffffff')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => {
        if (d.type === 'center') return d.name;
        if (d.name.length > 25) return d.name.substring(0, 25) + '...';
        return d.name;
      });

    // Add score badges
    node.filter(d => d.type !== 'center').append('circle')
      .attr('cx', 20)
      .attr('cy', -20)
      .attr('r', 15)
      .attr('fill', d => {
        const score = d.score;
        if (score >= 90) return '#4caf50';
        if (score >= 80) return '#2196f3';
        if (score >= 70) return '#ff9800';
        return '#f44336';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node.filter(d => d.type !== 'center').append('text')
      .attr('x', 20)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '10px')
      .attr('fill', '#fff')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => d.score);

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      if (!d.fixed) {
        d.fx = null;
        d.fy = null;
      }
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [getFilteredMarkets, getFilteredInfluencers, setSelectedMarket, setSelectedInfluencer]);

  return (
    <Box
      position="absolute"
      top={0}
      left="350px"
      right={0}
      bottom={0}
      bg="gray.900"
      overflow="hidden"
    >
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default DreamCanvas;
