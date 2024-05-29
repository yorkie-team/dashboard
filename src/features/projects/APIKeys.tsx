/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';

import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';
import { Icon, CopyButton } from 'components';
import { Button, Container, Heading, Flex, Box, Link, Text, Tooltip } from 'yorkie-ui';

export function APIKeys() {
  const { project } = useAppSelector(selectProjectDetail);
  const [revealSecretKey, setRevealSecretKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box paddingBlock="10">
      <Heading as="h2" fontSize="2xl" marginLeft="1" display="none">
        Project API Key
      </Heading>
      <Text fontSize="2xl" fontWeight="semibold" marginLeft="1" marginBottom="4.5">
        API
      </Text>
      <Box>
        <Flex alignItems="center" color="black.a8">
          <Heading as="h2" fontSize="2xl" marginLeft="1">
            Public key
          </Heading>
        </Flex>
        <Text color="black.a8" fontSize="xs" marginTop="4">
          The public key allows you to use Yorkie without implementing your own authentication endpoint.
        </Text>
      </Box>
      <Flex gap="6" alignItems="center" marginTop="4">
        <Box padding="3" borderRadius="sm" borderWidth="xs" width="100w">
          <span className="value">{project?.publicKey}</span>
        </Box>
        <CopyButton value={project?.publicKey!} timeout={1000}>
          {({ copied, copy }) => (
            <Box>
              <Tooltip.Root open={copied}>
                <Tooltip.Trigger>
                  <Button variant="outline" onClick={copy}>
                    Copy
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>
                    <Flex alignItems="center" gap="0.5">
                      <Icon type="check" /> <Text>Copied</Text>
                    </Flex>
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            </Box>
          )}
        </CopyButton>
      </Flex>
      <Box marginTop="16">
        <Flex alignItems="center" color="black.a8">
          <Heading as="h2" fontSize="2xl" marginLeft="1">
            Secret key
          </Heading>
        </Flex>
        <Text color="black.a8" fontSize="xs" marginTop="4">
          The secret key allows you to authenticate your API requests on your own backend endpoint.
        </Text>
      </Box>
      <Flex marginTop="6" gap="6" alignItems="center">
        <Box background="gray.a6" padding="1" borderRadius="lg" width="100w">
          <Flex>
            {!revealSecretKey && (
              <Button
                color="gray.a11"
                variant="ghost"
                onClick={() => {
                  setRevealSecretKey(true);
                }}
              >
                <Icon type="lockSmall" />
                Click to reveal secret key
              </Button>
            )}
            {revealSecretKey && <Text padding="2">{project?.secretKey}</Text>}
          </Flex>
        </Box>
        <CopyButton value={project?.secretKey!} timeout={1000}>
          {({ copied, copy }) => (
            <Box>
              <Tooltip.Root open={copied}>
                <Tooltip.Trigger>
                  <Button variant="outline" onClick={copy}>
                    Copy
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>
                    <Flex alignItems="center" gap="0.5">
                      <Icon type="check" /> <Text>Copied</Text>
                    </Flex>
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            </Box>
          )}
        </CopyButton>
      </Flex>
    </Box>
  );
}
