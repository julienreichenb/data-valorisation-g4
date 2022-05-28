    <template>
        <span>
            <small class="ml-2" :id="id">
                <sup>
                    <font-awesome-icon class="text-primary" icon="question-circle" />
                </sup>
            </small>
            <b-tooltip :target="id" variant="dark">
                <span v-html="text" />
            </b-tooltip>
        </span>
    </template>
    
    <script>
    export default {
        name: 'QuestionTooltip',
        props: {
            id: { type: String, required: true },
            text: { type: String, required: true },
        },
    }
    </script>
    
    <style>
    
    </style>