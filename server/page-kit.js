import React from 'react';
import ReactDOM from 'react-dom/server';
import { Shell } from '@financial-times/dotcom-ui-shell';
import { Layout } from '@financial-times/dotcom-ui-layout';

export default ({ response, next, shellProps, layoutProps }) => {
        layoutProps.navigationData = response.locals.navigation;
        layoutProps.headerOptions = { ...response.locals.anon};

        shellProps.scripts = response.locals.assetLoader.getScriptURLsFor('scripts');
        shellProps.stylesheets = [
            ...response.locals.assetLoader.getStylesheetURLsFor('page-kit-layout-styles'),
            ...response.locals.assetLoader.getStylesheetURLsFor('styles')
        ];

        return (error, html) => {
            if (error) {
                return next(error);
            }

            const document = React.createElement(Shell,
                {...shellProps},
                React.createElement(Layout, { ...layoutProps, contents: html })
            );

            response.send("<!DOCTYPE html>" + ReactDOM.renderToStaticMarkup(document));
        };
    };
