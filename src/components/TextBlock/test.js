import React from 'react';
import { render } from '@testing-library/react-native';
import TextBlock from './index.tsx';

describe('TextBlock Component', () => {
  it('renders the given text', () => {
    const testText = 'Hello, Jest!';
    const { getByText } = render(
      <TextBlock text={testText} style={{ color: 'red' }} />
    );
    expect(getByText(testText)).toBeTruthy();
  });

  it('applies the given style', () => {
    const testStyle = { color: 'blue', fontSize: 20 };
    const { getByText } = render(
      <TextBlock text="Styled Text" style={testStyle} />
    );
    const styledText = getByText('Styled Text');

    // Checking specific style properties
    expect(styledText.props.style).toMatchObject(testStyle);
  });
});
