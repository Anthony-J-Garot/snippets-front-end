import React from 'react';
import TestRenderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/client/testing';
import AllSnippets, {ALL_SNIPPETS_QUERY} from './index';

/*
 * Each mock object defines a request field (indicating the shape and variables of the operation to
 * match against) and a result field (indicating the shape of the response to return for that operation).
 */
const mocks = [
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    result: {
      data:
        {
          'allSnippets': [
            {
              'id': '1',
              'body': 'abcdefghijklmnopqrstuvwxyzABTTT',
              'created': '2018-06-13T08:02:21.517000+00:00',
              'private': true,
              'owner': 'john.smith',
              '__typename': 'SnippetType'
            },
            {
              'id': '2',
              'body': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\n\nThis shows a really long body. The body_preview or bodyPreview should truncate at a set # of chars.',
              'created': '2012-04-23T18:25:43.511000+00:00',
              'private': true,
              'owner': 'admin',
              '__typename': 'SnippetType'
            },
            {
              'id': '3',
              'body': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
              'created': '2012-04-23T18:25:43.511000+00:00',
              'private': false,
              'owner': 'admin',
              '__typename': 'SnippetType'
            }],
        },
    },
  },
];

it('renders without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AllSnippets />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children[0].children).toContain('Loading...');
});
