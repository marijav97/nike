var hotspots = [{
  
  title: 'Integrated rubber pods',
  position: { top: 70, left: 60 }
}];

var HotspotDetails = {
  name: 'HotspotDetails',
  template: '\n    <transition\n      name="detail"\n      @before-enter="beforeEnter"\n      @after-enter="afterEnter"\n      @before-leave="beforeLeave"\n      @after-leave="afterLeave"\n    >\n      <div class="hotspot-details">\n        <div class="hotspot-details__content">\n            <transition name="product-fade" mode="out-in">\n              <h3 class="hotspot-details__title animated" :key="selectedItem.title">{{ selectedItem.title }}</h3>\n            </transition>\n            <transition name="product-fade" mode="out-in">\n              <div class="hotspot-details__description animated" :key="selectedItem.title">{{ selectedItem.description }}</div>\n            </transition>\n          </div>\n      </div>\n    </transition>\n  ',
  props: {
    item: { type: Object },
    selectedIndex: { type: Number },
    allItems: { type: Array }
  },
  data: function data() {
    return {
      selectedItem: this.item
    };
  },

  methods: {
    close: function close() {
      this.$emit('close');
    },
    onProductSelected: function onProductSelected() {
      this.selectedItem = this.allItems[this.carousel.selectedIndex];
    },
    beforeEnter: function beforeEnter(el) {
      el.style.setProperty('--top', this.item.position.top + '%');
      el.style.setProperty('--left', this.item.position.left + '%');
      el.style.setProperty('top', this.item.position.top - 20 + '%');
      el.style.setProperty('left', this.item.position.left - 25 + '%');
    },
    afterEnter: function afterEnter(el) {
      el.classList.add('is-loaded');
    },
    beforeLeave: function beforeLeave(el) {
      el.classList.remove('is-loaded');
      this.$emit('after');
    },
    afterLeave: function afterLeave(el) {
      this.$emit('after');
    }
  }
};

var App = {
  name: 'app',
  components: {
    HotspotDetails: HotspotDetails
  },
  template: '\n    <div class="app">\n      <div class="image-hotspot" :class="{\'is-selected\': open }">\n        <hotspot-details \n          :item="selectedHotspot"\n          :selected-index="selectedIndex"\n          :all-items="hotspots"\n          @close="closeDetails"\n          v-on:after="closeAfter"\n          v-if="open"\n        ></hotspot-details>\n        <transition-group name="hotspots">\n          <a \n            href="#" \n            class="hotspot-point"\n            v-for="(hotspot, index) in hotspotItems"\n            :style="{ top: hotspot.position.top+\'%\', left: hotspot.position.left+\'%\' }"\n            @click.prevent="hotspotClicked(hotspot, index)"\n            :key="index"\n            :class="{ selected: hotspot.clicked }"\n          >\n              <span>\n                <svg class="icon icon-close" viewBox="0 0 24 24">\n                  <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>\n                </svg>\n              </span>\n          </a>\n        </transition-group>\n        <img src="https://bf-honfleur.s3.amazonaws.com/img/ship-explore.jpg" alt="" class="img-fluid">\n      </div>\n    </div>\n  ',
  data: function data() {
    return {
      hotspots: hotspots,
      open: false,
      hotspotPosition: null,
      selectedHotspot: null
    };
  },

  computed: {
    hotspotItems: function hotspotItems() {
      // return this.open ? [] : this.hotspots;
      return this.hotspots; // Displays all hotspots when displaying details
    }
  },
  methods: {
    closeDetails: function closeDetails() {
      this.open = false;
      // this.selectedHotspot.clicked = false;
    },
    closeAfter: function closeAfter() {
      console.log(this.selectedHotspot);
      this.selectedHotspot.clicked = false;
      this.selectedIndex = false;
    },
    hotspotClicked: function hotspotClicked(hotspot, index) {
      if (this.selectedIndex && this.selectedIndex !== index) {
        return;
      }

      if (this.selectedIndex === index) {
        this.open = false;
        this.selectedHotspot.clicked = false;
      } else {
        this.selectedHotspot = hotspot;
        this.selectedIndex = index;
        this.open = true;
        this.selectedHotspot.clicked = true;
      }
    }
  }
};

new Vue({
  el: '#app',
  components: {
    App: App
  },
  render: function render(h) {
    return h(App);
  }
});