<template>
<article class="page">
  <header>
    <h1>Notifications <code>&lt;pf-notifications&gt;</code></h1>
  </header>

  <section>
    <p>This component is a container for other <code>&lt;pf-notification&gt;</code> components. Notifications can be placed inside its default slot or added programmatically by calling the <code>add()</code> method.</p>
    <p>Notification dismissals will be handled automatically for the notifications added programmatically. For <code>&lt;pf-notification&gt;</code> components placed inside the default slot or without using the <code>&lt;pf-notifications&gt;</code> container you will have to listen to the <code>@dismiss</code> event.</p>

    <h4>Related documentation</h4>
    <ol>
      <li><a href="http://www.patternfly.org/pattern-library/communication/toast-notifications/#/api" target="_blank">Pattern Library > Toast Notifications</a></li>
      <li><a href="http://www.patternfly.org/pattern-library/communication/inline-notifications/#/api" target="_blank">Pattern Library > Inline Notifications</a></li>
    </ol>

    <pf-notifications ref="notifications"
                      :toast="notifications.toast">
    </pf-notifications>

    <props-table :component-props="notificationsProps">
      <props-row name="toast" description="Defines this as a container for toast notifications. The property is propagated to every <code>&amp;lt;pf-notification&amp;gt;</code> added programmatically. You are responsible to keep the property in sync for <code>&amp;lt;pf-notification&amp;gt;</code>s inserted manually." v-model="notifications.toast"></props-row>
    </props-table>

    <h3>Methods</h3>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Argument</th>
          <th>Description</th>
          <th colspan="2">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">add()</td>
          <td>notification</td>
          <td>The notification message string or an <code>Object</code> with every <code>&lt;pf-notification&gt;</code> property to use.</td>
          <td>
            <input type="text" class="form-control" v-model="notifications.message">
          </td>
          <td rowspan="2">
            <button class="btn btn-default" @click="notify">
              <span class="fa fa-play-circle"></span>
              Run
            </button>
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td><code>&lt;pf-notification&gt;</code>'s type</td>
          <td>
            <select class="form-control" v-model="notifications.type">
              <option value="info">info</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="danger">danger</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </section>


  <header>
    <h1>Notification <code>&lt;pf-notification&gt;</code></h1>
  </header>

  <section>
    <pf-notification :delay="notification.delay"
                     :type="notification.type"
                     :toast="notification.toast"
                     :persistent="notification.persistent"
                     :action="notification.action">
      <div v-html="notification.message"></div>
    </pf-notification>

    <props-table :component-props="notificationProps">
      <props-row name="delay" description="The delay in milliseconds after which the notification is automatically dismissed." v-model="notification.delay"></props-row>
      <props-row name="type" description="The type of notification. Can be on of: info, success, warning, danger." :options="['info', 'success', 'warning', 'danger']" v-model="notification.type"></props-row>
      <props-row name="toast" description="Make this a toast notification. These need to be placed inside a container with the <code>toast-notifications-list-pf</code> CSS class or inside a <code>&amp;lt;pf-notifications&amp;gt;</code> component." v-model="notification.toast"></props-row>
      <props-row name="persistent" description="Disables the controls to dismiss the notification." v-model="notification.persistent"></props-row>
      <tr>
        <td>action.name</td>
        <td>The text of an action button to add to the notification. This is mandatory to enable the action.</td>
        <td>String</td>
        <td></td>
        <td>
          <input class="form-control" type="text" v-model="notification.action.name">
        </td>
      </tr>
      <tr>
        <td>action.title</td>
        <td>The title for the action button.</td>
        <td>String</td>
        <td></td>
        <td>
          <input class="form-control" type="text" v-model="notification.action.title">
        </td>
      </tr>
      <tr>
        <td>action.button</td>
        <td>Controls the type of button to use for the action.</td>
        <td>String</td>
        <td>link</td>
        <td>
          <select class="form-control" v-model="notification.action.button">
            <option value="link">link</option>
            <option value="default">default</option>
            <option value="primary">primary</option>
            <option value="info">info</option>
            <option value="success">success</option>
            <option value="warning">warning</option>
            <option value="danger">danger</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>action.emit</td>
        <td>The name of an event that should be emitted when the action is triggered.</td>
        <td>String</td>
        <td>action</td>
        <td>
          <input class="form-control" type="text" v-model="notification.action.emit">
        </td>
      </tr>
    </props-table>

    <slots-table>
      <slots-row name="default" description="The notification message" v-model="notification.message"></slots-row>
    </slots-table>
  </section>
</article>
</template>

<script>
import VuePatternfly from 'vue-patternfly';
const Notification = VuePatternfly.Notification;
const Notifications = VuePatternfly.Notifications;

export default {
  name: 'notifications-page',

  components: {
    'pf-notification': Notification,
  },

  data() {
    return {
      notificationProps: Notification.props,
      notification: {
        delay: Notification.props.delay.default,
        type: Notification.props.type.default,
        toast: Notification.props.toast.default,
        persistent: Notification.props.persistent.default,
        message: '<strong>Test</strong> notification',
        action: {
          name: '',
          title: '',
          button: 'link',
          emit: '',
        },
      },
      notificationsProps: Notifications.props,
      notifications: {
        message: '<strong>Test</strong> notification',
        type: 'info',
        toast: Notifications.props.toast.default,
      },
    };
  },

  methods: {
    notify() {
      this.$refs.notifications.add(this.notifications.message, this.notifications.type);
    },
  },
};
</script>
