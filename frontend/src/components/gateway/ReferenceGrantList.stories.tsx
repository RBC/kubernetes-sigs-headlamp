/*
 * Copyright 2025 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Meta, StoryFn } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { TestContext } from '../../test';
import ReferenceGrantList from './ReferenceGrantList';
import { DEFAULT_REFERENCE_GRANT } from './storyHelper';

export default {
  title: 'ReferenceGrant/ListView',
  component: ReferenceGrantList,
  argTypes: {},
  decorators: [
    Story => {
      return (
        <TestContext>
          <Story />
        </TestContext>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: {
        storyBase: [],
        story: [
          http.get(
            'http://localhost:4466/apis/gateway.networking.k8s.io/v1beta1/referencegrants',
            () =>
              HttpResponse.json({
                kind: 'ReferenceGrantList',
                apiVersion: 'gateway.networking.k8s.io/v1beta1',
                metadata: {},
                items: [DEFAULT_REFERENCE_GRANT],
              })
          ),
        ],
      },
    },
  },
} as Meta;

const Template: StoryFn = () => {
  return <ReferenceGrantList />;
};

export const Items = Template.bind({});
