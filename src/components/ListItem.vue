<template>
  <li class="item" :class="{'item--active':isActive}">
    <img v-if="cover" :src="cover" class="item__cover">
    <div class="item__info">
      <h3 class="item__info__title">{{title}}</h3>
      <span class="item__info__sub-title">
                        {{subtitle}}
                    </span>
    </div>
    <span class="item__time">
                {{number}}
            </span>
  </li>
</template>
<script>
export default {
  name: 'list-item',
  props: [
    'isActive',
    'cover',
    'title',
    'subtitle',
    'number'
  ]
}

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.item {
  margin-right: -1px;
  background: #4a473c;
  display: flex;
  justify-content: space-between;
  padding: 2rem 3rem;
  cursor: pointer;
  border-bottom: 1px solid #3f3d34;
  &__cover {
    width: 3rem;
    height: 3rem;
    max-width: 100%;
  }
  &__info {
    margin: 0 2rem;
    width: 100%;
  }
  &--active {
    color: #f9934e;
  }
}

</style>

