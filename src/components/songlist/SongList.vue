<template>
    <div class="songlist">
        <header class="songlist__header">
            <h1 class="songlist__title">{{title}}</h1>
        </header>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
	computed:{
		...mapGetters([
			'title'
		])
	}
}

</script>

