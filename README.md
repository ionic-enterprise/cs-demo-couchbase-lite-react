# Couchbase Lite Storage Demo - Tea Categories

This application performs full CRUD operations storing the data in a local Couchbase Lite database. The solution used for this application is a special purpose plugin, and its functionality is tailored around a specific customer's needs. This plugin is best used only for applications that have a specific need to support Couchbase. For a better general offline storage option that is not dependent on Couchbase, please see our <a href="https://ionic.io/products/secure-storage" target="_blank">Secure Storage solution</a>.

## Running the Application

In order to run this application, you need access to the Ionic Enterprise Couchbase Lite plugin. If you have a specific need for Couchbase Lite support and do not have access to this plugin, please contact your account manager.

Here are the general steps required to run this application:

- clone the repo and change to its root directory
- `npm install`
- `npm run build`
- `ionic cap sync`
- `ionic cap run ios` (and/or android)

At this point you should be able to side-load the application on a device or run it in an emulator and try it out.

## General Architecture

This application uses a Couchbase Lite database to manage a list of tea categories. The project is structured using feature folders; all code relating to tea categories resides in `/src/tea-categories`.

### Tea Categories Provider

This React Context/Provider handles all of the CRUD operations for the tea categories database. Provider methods communicate with callers by passing tea categories as regular typed TypeScript models rather than database object. This allows the storage mechanism to change without affecting the callers.

The `<TeaCategoriesProvider>` wraps the `<IonRouterOutlet>` in `App.tsx` making the context available to all pages within the router outlet.

### Tea Categories Hook

Individual pages use the `useTeaCategories()` hook to call methods defined within the tea categories context. This small abstraction of the tea categories context ensures that any components trying to access the context are a child component of the context -- otherwise the context is not accessible.

### Pages

There are two pages in this application:

1. `TeaCategories.tsx`
2. `TeaCategoryEditor.tsx`

These pages know nothing about how the data is stored. The logic in the pages is only concerned with how the data is displayed and manipulated on the pages themselves. The end result being that if the way data is stored, the logic in the pages does not need to be touched.
