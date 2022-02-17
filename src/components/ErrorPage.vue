<template>
  <div>
    <div class="px-4 lg:py-12">
      <div
        class="flex flex-col items-center justify-center md:py-24 lg:py-32"
      >
        <h1 class="font-bold text-red-400 text-9xl">500</h1>
        <p
          class="mb-2 text-2xl font-bold text-center text-gray-300 md:text-3xl"
        >
          現在修復中です！しばらくお待ちください
        </p>
        <a
          href="/"
          class="px-6 py-2 text-sm font-semibold text-blue-300"
          >トップページに戻る</a
        >
      </div>
      <!-- <div class="mt-4">
        <img
          src="@/assets/scott-brooks.jpeg"
          alt="img"
          class="object-cover w-full h-full"
        />
      </div>-->
    </div>
  </div>
</template>

<script>

export default {
  props: ["message"],
  setup() {
    return {
    }
  }
}
</script>
