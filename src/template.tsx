import {
  Link,
  LoadingPage,
  Typography,
  defaultApiErrorHandler,
  defaultErrorMessageI18nHandler,
  initializeAutoRefreshToken,
  initializeServiceVersionCheckers,
  createRedirect,
  loadDefaultTranslations,
  createMenuItemDefault,
  createNavigation,
  createSideNavigationItemDefault,
  NavigationHeaderElement,
  Error500,
  NotFound404,
  Template,
  TemplateOpts,
  ToastsDisplay,
  loadTranslationsFromYaml,
} from '@basaldev/blocks-frontend-framework';
import { api, log, session } from '@basaldev/blocks-frontend-sdk';
import merge from 'lodash.merge';
import partial from 'lodash.partial';

import { createHelloWorldIndex, HelloWorldShow } from './block/HelloWorld';
import translationOverrides from './translationOverrides.yaml';

interface HelloWorldAppTemplateDependencies {
  /** Auth api client */
  authApi: Pick<
    api.AuthApi,
    'login' | 'logout' | 'refresh' | 'getRequiredVersion' | 'ping'
  >;
  /** Session service for managing user sessions */
  sessionService: session.SessionService;
  /** User data api client */
  userApi: Pick<api.UserApi, 'getUser' | 'getRequiredVersion' | 'ping'>;
}

export class HelloWorldAppTemplate implements Template {
  opts: Required<TemplateOpts>;
  dependencies: HelloWorldAppTemplateDependencies;

  constructor(
    opts: TemplateOpts,
    dependencies: HelloWorldAppTemplateDependencies
  ) {
    this.opts = merge<Required<TemplateOpts>, TemplateOpts>(
      {
        apiErrorHandler: partial(defaultApiErrorHandler, dependencies.authApi),
        appInitialization: [
          partial(initializeAutoRefreshToken, dependencies.authApi, {
            refreshIntervalMs: 5 * 60 * 1000,
          }),
          partial(initializeServiceVersionCheckers, [
            dependencies.authApi,
            dependencies.userApi,
          ]),
        ],
        appInitializationLoader: LoadingPage,
        appName: 'hello-world-app',
        blockPages: [
          {
            component: createRedirect({
              options: { replace: true },
              to: 'hello-world.index',
            }),
            name: 'home',
            path: '/',
          },
          {
            component: createHelloWorldIndex({
              authApi: dependencies.authApi,
            }),
            name: 'hello-world.index',
            pageTitle: (t) => t('HelloWorld:titleIndex'),
            path: '/hello-world',
          },
          {
            component: HelloWorldShow,
            name: 'hello-world.show',
            navigationOptions: {
              type: 'singleItem',
            },
            pageTitle: {
              fallback: (t) => t('HelloWorld:titleShow', { page: '' }),
              fetch: async (blockProps, t, updatePageTitle) => {
                // Fake 1 second delay to simulate fetching data
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Update page title
                updatePageTitle(
                  t('HelloWorld:titleShow', {
                    page: blockProps.params.helloWorldId,
                  })
                );
              },
            },
            parentBlockPath: 'hello-world.index',
            path: '/hello-world/:helloWorldId',
          },
        ],
        error500Component: Error500,
        errorMessageI18nHandler: defaultErrorMessageI18nHandler,
        i18nOptions: {
          resources: merge(
            loadDefaultTranslations(),
            loadTranslationsFromYaml(translationOverrides)
          ),
        },
        logger: new log.FrontendLogger({
          appName: opts.appName ?? 'hello-world-app',
          // @ts-expect-error vite defines magic property
          env: import.meta.env.PROD ? 'production' : 'development',
        }),
        navigationComponent: createNavigation({
          headerElements: (isLoggedIn: boolean): NavigationHeaderElement => {
            if (isLoggedIn) {
              return {
                icons: [{ icon: 'chat' }, { icon: 'notifications' }],
                type: 'icons',
              };
            }

            return {
              buttons: [
                {
                  children: 'ログイン',
                },
                {
                  children: '無料登録',
                  fill: 'fill',
                },
              ],
              links: [
                {
                  to: 'hello-world.index',
                },
                {
                  to: 'hello-world.index',
                },
              ],
              type: 'buttons',
            };
          },
          headerLogoElement: (onNavigate) => (
            <Link href="/" onNavigate={onNavigate}>
              <Typography color="brand" weight="bold" size="2XL">
                Nodeblocks
              </Typography>
            </Link>
          ),
          menuNavigationBlocks: [
            createMenuItemDefault({
              params: { helloWorldId: 'id-4' },
              text: 'サブページ4',
              toRoute: 'hello-world.show',
            }),
            createMenuItemDefault({
              params: { helloWorldId: 'id-5' },
              text: 'サブページ5',
              toRoute: 'hello-world.show',
            }),
          ],
          sideNavigationBlocks: [
            createSideNavigationItemDefault({
              icon: 'home',
              params: { helloWorldId: 'id-5' },
              requiresLogin: true,
              text: 'Hello World',
              toRoute: 'hello-world.index',
            }),
          ],
        }),
        notFound404Component: NotFound404,
        pageTitleConfiguration: {
          appName: 'Hello World',
        },
        screenConfiguration: {
          desktopCutoff: 950,
          enabledSizes: {
            bigDesktop: true,
            desktop: true,
            mobile: true,
          },
          mobileCutoff: 640,
        },
        theme: {
          configs: {
            timezone: 'Asia/Tokyo',
          },
        },
        toastConfiguration: {
          displayMs: 5000,
          toastComponent: ToastsDisplay,
        },
      },
      opts
    );
    this.dependencies = dependencies;
  }
}
