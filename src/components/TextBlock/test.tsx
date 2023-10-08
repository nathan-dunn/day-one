import React from 'react';
import { render } from '@testing-library/react-native';
import TextBlock from './index';
import { TextStyle } from 'react-native';

describe('TextBlock Component', () => {
  test('renders the given text', () => {
    const testText = 'Hello, Jest!';
    const { getByText } = render(
      <TextBlock text={testText} style={{ color: 'red' }} />
    );
    expect(getByText(testText)).toBeTruthy();
  });

  test('applies the given style', () => {
    const testStyle: TextStyle = { color: 'blue', fontSize: 20 };
    const { getByText } = render(
      <TextBlock text="Styled Text" style={testStyle} />
    );
    const styledText = getByText('Styled Text');

    // Checking specific style properties
    expect(styledText.props.style).toMatchObject(testStyle);
  });
});
