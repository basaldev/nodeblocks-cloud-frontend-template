import {
  Button,
  Page,
  Spacing,
  Link,
  Typography,
  useApiMutation,
  BlockComponentProps,
  useTranslation,
} from '@basaldev/blocks-frontend-framework';
import { api } from '@basaldev/blocks-frontend-sdk';
import React from 'react';

export interface HelloWorldIndexOptions {
  authApi: Pick<api.AuthApi, 'login' | 'logout'>;
}

export const createHelloWorldIndex = ({ authApi }: HelloWorldIndexOptions) => {
  const HelloWorldIndex: React.FC<BlockComponentProps> = ({
    urlForRoute,
    onNavigate,
    showToast,
    screenMode,
    sessionState,
  }) => {
    const { t } = useTranslation();
    const [onLogin, isLoggingIn] = useApiMutation(authApi.login.bind(authApi), {
      showToast,
      successMessage: t('HelloWorld:loginSuccessMessage'),
    });
    const [onLogout, isLoggingOut] = useApiMutation(
      authApi.logout.bind(authApi),
      {
        showToast,
        successMessage: t('HelloWorld:logoutSuccessMessage'),
      }
    );
    return (
      <Page
        layoutType="smallForm"
        screenMode={screenMode}
        pageTitle={t('HelloWorld:titleIndex')}
      >
        <Spacing gapSize="M">
          <Typography type="paragraph">
            {t('HelloWorld:descriptionIndex')}
          </Typography>
          <Typography type="heading">{t('HelloWorld:headingToast')}</Typography>
          <Button
            onClick={() => showToast(t('HelloWorld:showToastMessage'))}
            size="S"
            textSize="S"
          >
            {t('HelloWorld:buttonShowToast')}
          </Button>
          <Typography type="heading">
            {t('HelloWorld:headingNavigation')}
          </Typography>
          <Typography type="paragraph">
            {t('HelloWorld:descriptionNavigation')}
          </Typography>
          <Typography type="paragraph">
            <Link
              onNavigate={onNavigate}
              href={urlForRoute('hello-world.show', { helloWorldId: 'id-1' })}
            >
              {t('HelloWorld:linkToShow', { page: '1' })}
            </Link>
          </Typography>
          <Typography type="paragraph">
            <Link
              onNavigate={onNavigate}
              href={urlForRoute('hello-world.show', { helloWorldId: 'id-2' })}
            >
              {t('HelloWorld:linkToShow', { page: '2' })}
            </Link>
          </Typography>
          <Typography type="paragraph">
            <Link
              onNavigate={onNavigate}
              href={urlForRoute('hello-world.show', { helloWorldId: 'id-3' })}
            >
              {t('HelloWorld:linkToShow', { page: '3' })}
            </Link>
          </Typography>
          <Typography type="heading">
            {t('HelloWorld:headingSession')}
          </Typography>
          <Typography type="paragraph">
            {t('HelloWorld:descriptionSession')}
          </Typography>
          <div>
            <code>{JSON.stringify(sessionState, undefined, 2)}</code>
          </div>
          <Button
            onClick={() =>
              void onLogin({ email: 'test@email.com', password: 'password' })
            }
            fill={sessionState.isLoggedIn ? 'fill0' : 'fill'}
            isDisabled={isLoggingIn || isLoggingOut}
            size="S"
            textSize="S"
          >
            {t('HelloWorld:buttonLogin')}
          </Button>
          <Button
            onClick={() => {
              void onLogout({});
            }}
            fill={sessionState.isLoggedIn ? 'fill' : 'fill0'}
            isDisabled={isLoggingIn || isLoggingOut}
            size="S"
            textSize="S"
          >
            {t('HelloWorld:buttonLogout')}
          </Button>
        </Spacing>
      </Page>
    );
  };

  return HelloWorldIndex;
};
