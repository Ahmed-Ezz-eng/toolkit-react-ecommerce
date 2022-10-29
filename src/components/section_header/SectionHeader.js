
import React from 'react';
import { SectionTilte } from './sectionHeaderStyle';

const SectionHeader = ({header}) => {
  return (
    <SectionTilte data-fill-text = {header} component="h2" variant="h2">
        {header}
    </SectionTilte>
  )
}

export default React.memo(SectionHeader)