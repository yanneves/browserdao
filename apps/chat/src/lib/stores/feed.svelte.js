class Feed {
  status = $state.raw("idle");
  network = $state.raw("connecting");
  thoughts = $state([]);

  constructor() {}

  reset() {
    this.status = "idle";
    this.thoughts = [];
  }
}

export default new Feed();
