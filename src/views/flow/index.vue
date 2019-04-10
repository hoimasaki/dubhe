<template>
  <div class="row">
       <div id="workflow-chart">
        <workflow-chart
            :style="100"
            :transitions="transitions"
            :states="states"
            :stateSemantics="stateSemantics"
            :orientation="'horizontal'"
            @state-click="onLabelClicked('state',$event)"
            @transition-click="onLabelClicked('transition', $event)"
            @size-change="sizeChanged" />
    </div>
  </div>
</template>
<style lang="scss">
#workflow-chart {
    display: flex;
    justify-content: left;
    padding-top: 80px;
    height:400px;
}

$approve-color: #1eb2a4;
$delete-color: #d64b61;

.vue-workflow-chart-state {
    &-approve {
        color: white;
        background: $approve-color;
    }
    &-delete {
        color: white;
        background: $delete-color;
    }
}
.vue-workflow-chart-transition-arrow {
    &-approve {
        fill: $approve-color;
    }
    &-delete {
        fill: $delete-color;
    }
}
.vue-workflow-chart-transition-path {
    &-approve {
        stroke: $approve-color;
    }
    &-delete {
        stroke: $delete-color;
    }
}
.vue-workflow-chart-transition-label{
    color:#FFF;
    background: rgb(45, 53, 60) !important;
}
</style> 
<script>
import WorkflowChart from "vue-workflow-chart";
import "vue-workflow-chart/dist/vue-workflow-chart.css";

export default {
  data() {
    return {
       states: [{
            "id": "J4zloua",
            "label": "Auditting",
        }, {
            "id": "Jcxrmx",
            "label": "Released",
        }, {
            "id": "Tu2vqbl",
            "label": "Verification by responsible",
        }, {
            "id": "static_state_deleted",
            "label": "Deleted",
        }, {
            "id": "static_state_new",
            "label": "New",
        }],
        transitions: [{
            "id": "1111",
            "label": "TestFlow",
            "target": "static_state_new",
            "source": "J4zloua",
        },{
            "id": "Dz2un1r",
            "label": "ask for auditing",
            "target": "J4zloua",
            "source": "Tu2vqbl",
        }, {
            "id": "Ev0huzn",
            "label": "restore",
            "target": "static_state_new",
            "source": "static_state_deleted",
        }, {
            "id": "Fst7op",
            "label": "release",
            "target": "Jcxrmx",
            "source": "Tu2vqbl",
        }, {
            "id": "Lwed6qb",
            "label": "discard draft",
            "target": "static_state_deleted",
            "source": "Tu2vqbl",
        }, {
            "id": "Mmpn8w",
            "label": "discard request",
            "target": "static_state_deleted",
            "source": "J4zloua",
        }, {
            "id": "Qw136br",
            "label": "delete",
            "target": "static_state_deleted",
            "source": "Jcxrmx",
        }, {
            "id": "Stf8g2b",
            "label": "revise request",
            "target": "J4zloua",
            "source": "static_state_new",
        }, {
            "id": "Tznk4f5",
            "label": "start new revision",
            "target": "J4zloua",
            "source": "Jcxrmx",
        }, {
            "id": "Usvtzqi",
            "label": "release revision",
            "target": "Tu2vqbl",
            "source": "J4zloua",
        }],
        stateSemantics: [{
            "classname": "delete",
            "id":"static_state_deleted",
        }],
        size: { width: '0px', height: '0px' },
    };
  },
  created(){
        const approveLabel = state => state.label === 'Released';
        const semantic = item => ({ id: item.id, classname: 'approve' });
        const approvedState = this.states.filter(approveLabel).map(semantic);
        this.stateSemantics = [ ...this.stateSemantics, ...approvedState ];
        console.log(this.stateSemantics)
  },
  computed: {},
  components: {
    WorkflowChart
  },
  methods: {
       onLabelClicked(type, id) {
            $.Notification.notify(
          "black",
          "top right",
          "节点信息",
          `ID: ${id}`
        );
         this.stateSemantics.push({id:id,classname:"approve"})
         console.log(this.stateSemantics)
        },
        sizeChanged(size) {
            this.size = {
                width: `${size.width}px`,
                height: `${size.height}px`,
            };
        },
  },
  mounted() {
  },

  filters: {}
};
</script>
