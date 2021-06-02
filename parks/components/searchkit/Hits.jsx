import React from 'react'
import { EuiFlexItem, EuiFlexGroup, EuiTitle, EuiText } from '@elastic/eui'

export const HitsGrid = ({ data }) => (
  <EuiFlexGrid gutterSize="l">
    {data?.results.hits.items.map((hit) => (
      <EuiFlexItem key={hit.id} grow={2}>
        <EuiCard
          grow={false}
          textAlign="left"
          image={<img style={{ maxWidth: 200 }} alt="Nature" />}
          title={hit.fields.title}
          description={hit.fields.description}
        />
      </EuiFlexItem>
    ))}
  </EuiFlexGrid>
)

export const HitsList = ({ data }) => (
  <>
    {data?.results.hits.items.map((hit) => (
      <EuiFlexGroup gutterSize="xl" key={hit.id}>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem grow={6}>
              <EuiTitle size="xs">
                <a href={hit.fields.nps_link}><h6>{hit.fields.title} ({hit.fields.states.join(', ')})</h6></a>
              </EuiTitle>
              <EuiText>
                <p>{hit.fields.description}</p>
              </EuiText>
              <EuiText>
                <a href={hit.fields.nps_link}>Read more »</a>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    ))}
  </>
)
