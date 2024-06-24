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
import { Icon, CodeBlock, CopyButton } from 'components';
import { Button, Container, Heading, Flex, Box, Text, Tooltip } from 'yorkie-ui';

type Snippet = 'npm' | 'cdn';

export function Overview() {
  const { project } = useAppSelector(selectProjectDetail);
  const [snippetType, setSnippetType] = useState<Snippet>('npm');
  const snippet = {
    npm: `import yorkie from 'yorkie-js-sdk';

async function main() {
  const client = new yorkie.Client('${process.env.REACT_APP_API_ADDR}', {
    apiKey: '${project?.publicKey}',
  });
  await client.activate();

  const doc = new yorkie.Document('my-first-document');
  doc.subscribe('presence', (event) => {
    const peers = doc.getPresences();
    // Add element to HTML as shown below:
    // <div>There are currently <span id='peersCount'></span> peers!</div>
    document.getElementById('peersCount').innerHTML = peers.length;
  })
  await client.attach(doc);
}
main();`,
    cdn: `<div>There are currently <span id='peersCount'></span> peers!</div>

<!-- include yorkie js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/yorkie-js-sdk/${process.env.REACT_APP_JS_SDK_VERSION}/yorkie-js-sdk.js"></script>
<script>
  async function main() {
    const client = new yorkie.Client('${process.env.REACT_APP_API_ADDR}', {
      apiKey: '${project?.publicKey}',
    });
    await client.activate();

    const doc = new yorkie.Document('my-first-document');
    doc.subscribe('presence', (event) => {
      const peers = doc.getPresences();
      document.getElementById('peersCount').innerHTML = peers.length;
    })
    await client.attach(doc);
  }
  main();
</script>`,
  };

  return (
    <Container
      paddingBlock={{ base: '6', lg: '10' }}
      marginInline="auto"
      paddingInline={{ base: '6', lg: '0' }}
      width={{
        sm: 'breakpoint-sm',
        md: 'breakpoint-md',
        lg: 'breakpoint-lg',
        xl: 'breakpoint-xl',
      }}
    >
      <Box>
        <Flex alignItems="center" color="neutral.default">
          <Icon type="messageSmile" />
          <Heading as="h2" fontSize="2xl" marginLeft="1">
            Your project is ready!
          </Heading>
        </Flex>
        <Text color="neutral.default" fontSize="xs" marginTop="4">
          Your project is now ready to use with its own APIs.
        </Text>
      </Box>
      <Flex alignItems="center" color="neutral.default" marginBlock="16">
        <Icon type="route" />
        <Heading as="h2" fontSize={{ base: 'xl', xl: '2xl' }} marginLeft="1">
          Add Yorkie SDK in your app
        </Heading>
      </Flex>
      <Flex gap="6" marginBottom="6">
        <Button variant={snippetType === 'npm' ? 'solid' : 'ghost'} onClick={() => setSnippetType('npm')}>
          Use npm
        </Button>
        <Button variant={snippetType === 'cdn' ? 'solid' : 'ghost'} onClick={() => setSnippetType('cdn')}>
          Use a &lt;script&gt; tag
        </Button>
      </Flex>
      <Box borderWidth="1px" />
      {snippetType === 'npm' && (
        <Box marginTop="6">
          <Box alignItems="center" color="neutral.default" marginBlock="10">
            <Heading as="h2" fontSize="2xl" marginLeft="1">
              Use npm
            </Heading>
            <Text color="neutral.default" fontSize="xs" marginTop="4">
              Your project is now ready to use with its own APIs.
            </Text>
          </Box>
          <Box position="relative">
            <div className="codeblock">
              <CodeBlock.Code code="$ npm install yorkie-js-sdk" language="bash" />
            </div>
            <Box
              position="absolute"
              right="2"
              bottom="0"
              top="0"
              margin="auto"
              height="fit"
              zIndex="xs"
              background="neutral.1"
            >
              <CopyButton value="npm install yorkie-js-sdk" timeout={1000}>
                {({ copied, copy }) => (
                  <Box>
                    <Tooltip.Root open={copied}>
                      <Tooltip.Trigger>
                        <Button variant="outline" onClick={copy} fontSize="xs" size="xs" color="gray.a8">
                          <Icon type="copy" />
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
            </Box>
          </Box>
          <Text color="neutral.default" fontSize="xs" marginBlock="6">
            Then, import yorkie and begin using the SDKs.
          </Text>
          <Box borderWidth="xs" borderRadius="xl" paddingBlock="6" position="relative">
            <Box fontSize="sm" overflow="scroll">
              <CodeBlock.Code code={snippet.npm} language="javascript" withLineNumbers />
            </Box>
            <Box position="absolute" right="2" top="2" height="fit" zIndex="xs" background="neutral.1">
              <CopyButton value={snippet.npm} timeout={1000}>
                {({ copied, copy }) => (
                  <Box>
                    <Tooltip.Root open={copied}>
                      <Tooltip.Trigger>
                        <Button variant="outline" onClick={copy} size="xs" color="gray.a8">
                          <Icon type="copy" />
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
            </Box>
          </Box>
        </Box>
      )}
      {snippetType === 'cdn' && (
        <Box>
          <Box alignItems="center" color="neutral.default" marginBlock="10">
            <Heading as="h2" fontSize="2xl" marginLeft="1">
              Use a &lt;script&gt; tag
            </Heading>
            <Text color="neutral.default" fontSize="xs" marginTop="4">
              Copy and paste the following script into the bottom of your &lt;body&gt; tag.
            </Text>
          </Box>
          <Box borderWidth="xs" borderRadius="xl" paddingBlock="6" position="relative">
            <Box fontSize="sm" overflow="scroll">
              <CodeBlock.Code code={snippet.cdn} language="markup" withLineNumbers />
            </Box>
            <Box position="absolute" right="2" top="2" height="fit" zIndex="xs" background="neutral.1">
              <CopyButton value={snippet.cdn} timeout={1000}>
                {({ copied, copy }) => (
                  <Box>
                    <Tooltip.Root open={copied}>
                      <Tooltip.Trigger>
                        <Button variant="outline" onClick={copy} color="gray.a8" size="xs">
                          <Icon type="copy" />
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
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
