import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { Checkbox, Text, VStack, Box } from '@chakra-ui/react';

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <Box mt={10}>
      <Text color="gray.500" fontWeight="bold">Label</Text>
      <VStack align="start" mt={3}>
        {labels.map(({ label: lbl, checked }, idx) => (
          <Checkbox
            key={idx}
            isChecked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            colorScheme={lbl} // Assuming you have defined these color schemes in your Chakra UI theme
            size="lg"
          >
            <Text ml={2} color="gray.700" textTransform="capitalize">
              {lbl}
            </Text>
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
}
