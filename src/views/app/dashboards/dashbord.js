import React, { useState, useMemo, useEffect, Fragment } from 'react';

import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { LinkHorizontal } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { Zoom } from '@visx/zoom';
import { Modal, ModalBody } from 'reactstrap';
import Classes from './style.module.css';

import rawTree from '../../../data/rawTree';
const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const lightpurple = '#374469';
const white = '#ffffff';
export const background = '#3E884F';

/** Handles rendering Root, Parent, and other Nodes. */
function Node({ node }) {
  const width = 20;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;
  const [detailVerif, setdetails] = useState(false);

  if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  function openDetailsModal(name) {
    setdetails(true);
  }

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={background}
        strokeWidth={1}
        strokeDasharray='2,2'
        strokeOpacity={0.6}
        rx={10}
        onClick={() => openDetailsModal(node.data.name)}
      />
      <Modal
        centered
        isOpen={detailVerif}
        toggle={() => setdetails(false)}
        className={Classes.Modalregister}
        style={{ width: '34%' }}>
        <ModalBody
          style={{
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <div
            style={{
              height: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <h3
              style={{
                display: 'flex',
                fontWeight: 'bold',

                color: '#3b695b',
              }}>
              Species Details
            </h3>
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              {node.data.name}
            </h3>
          </div>
        </ModalBody>
      </Modal>
      <text
        dy='.33em'
        fontSize={9}
        fontFamily='Arial'
        textAnchor='middle'
        fill={green}
        style={{ pointerEvents: 'none' }}>
        {node.data.name}
      </text>
    </Group>
  );
}

function RootNode({ node }) {
  return (
    <Group top={node.x} left={node.y}>
      <text
        dy='1em'
        fontSize={12}
        fontFamily='Arial'
        textAnchor='middle'
        cursor='pointer'
        style={{ pointerEvents: 'none' }}
        fill={white}>
        {node.data.name}
      </text>
    </Group>
  );
}

function ParentNode({ node }) {
  const width = 20;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={background}
        strokeWidth={1}
        onClick={() => {
          alert(`clicked: ${JSON.stringify(node.data.name)}`);
        }}
      />
      <text
        dy='.33em'
        fontSize={9}
        fontFamily='Arial'
        textAnchor='middle'
        style={{ pointerEvents: 'none' }}
        fill={white}>
        {node.data.name}
      </text>
    </Group>
  );
}

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };

function Example({ width, height, margin = defaultMargin }) {
  const data = useMemo(() => hierarchy(rawTree), []);
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <LinearGradient id='lg' from={peach} to={pink} />
      <rect width={width} height={height} rx={14} fill={background} />
      <Tree root={data} size={[yMax, xMax]}>
        {(tree) => (
          <Group top={margin.top} left={margin.left}>
            {tree.links().map((link, i) => (
              <LinkHorizontal
                key={`link-${i}`}
                data={link}
                stroke={lightpurple}
                strokeWidth='1'
                fill='none'
              />
            ))}
            {tree.descendants().map((node, i) => (
              <Node key={`node-${i}`} node={node} />
            ))}
          </Group>
        )}
      </Tree>
    </svg>
  );
}

export default function Dashbord() {
  return (
    <div>
      <div
      className={Classes.titlerank}
       >
        Tree Dashboard For Rank Of Species
        
       
      </div>
      <Example width={1200} height={2000}  />
    </div>
  );
}
