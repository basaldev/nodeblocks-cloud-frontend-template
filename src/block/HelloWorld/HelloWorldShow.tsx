import {
  Page,
  Spacing,
  Link,
  Typography,
  BlockComponentProps,
  useTranslation,
} from '@basaldev/blocks-frontend-framework';
import React from 'react';

export const HelloWorldShow: React.FC<BlockComponentProps> = ({
  urlForRoute,
  onNavigate,
  params,
  screenMode,
}) => {
  const { t } = useTranslation();
  const helloWorldId = params.helloWorldId;

  return (
    <Page layoutType="primaryScreenOnly" screenMode={screenMode}>
      <Spacing gapSize="M" leftRightPaddingSize="XS" topBottomPaddingSize="M">
        <Typography type="paragraph">
          {t('HelloWorld:descriptionShow', { page: helloWorldId })}
        </Typography>
        <Typography type="paragraph">
          <Link onNavigate={onNavigate} href={urlForRoute('hello-world.index')}>
            {t('HelloWorld:linkBackToIndex')}
          </Link>
        </Typography>
      </Spacing>
    </Page>
  );
};
