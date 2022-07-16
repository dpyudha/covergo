# CoverGo exercise

#### 1. Tech Stack

- Vue 2
- Vite
- TailwindCSS

#### 2. Folders Structure

```
+ src
  + assets : store all assets file
  + components
    + common : for common component
    + forms : for form component
    + FormWizard : for form wizard component
  + constants : language file
  + helpers : store all global function
  + mixins : global vue mixins
```
###### Components Folder
For the components, i seperated it into 3 folders. So its easy for us to understand what kind of components that we have.

###### Constants Folder
This is language file, to store all strings that we used on the app. So we can avoid typo if want to use the same strings in few components.

###### Helpers Folder
We should separate global function. Just in case we will reuse that. In this case, im creating global validator function and use it in all form component

###### Mixins Folder
In this case, my forms component like TextField, Select and RadioButton have similar logic. Thats why im creating mixins to share props, methods, and data between them.

#### 3. Data
Since this is form wizard, im just store the form data into Vue Data. If we refresh the page it will reset all data and state, and redirect it into first page.

#### 4. FormWizard
For the wizard, there are 2 components. FormWizardWrapper and FormWizardContent. Here is the example of the usage

```
<form-wizard-wrapper
    :error=""
    @reset=""
>
    <form-wizard-content
        :selected="true"
        title="Intro"
        :has-form="false"
    >
    ...
    </form-wizard-content>
    <form-wizard-content
        title="Form"
    >
    form...
    </form-wizard-content>
    <form-wizard-content
        title="Summary"
        :has-form="false"
    >
    ...
    </form-wizard-content>
</form-wizard-wrapper>
```

**4.1. FormWizardWrapper**
This is wrapper component for formwizard.

**Available props**

| Prop                          | Type            | Default     | Description                              |
|-------------------------------|-----------------|-------------|------------------------------------------|
| error                         | Boolean    |     false        | To pass error state from form page             |

**Available Events**

| Event                          | Output        | Description                              |
|-------------------------------|--------------------|------------------------------------------|
| reset                         |            | wizard is being reset             |
**4.2. FormWizardContent**
This is wrapper for formwizard's content.

**Available props**

| Prop                          | Type            | Default     | Description                              |
|-------------------------------|-----------------|-------------|------------------------------------------|
| selected                         | Boolean    |     false        | content that being displayed             |
| title                         | String    |             | content title, this is required             |
| hasForm                         | Boolean    |     true        | if the content is not contain form, we should set this as false           |

