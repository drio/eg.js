JS_FILES=src/server/eg-probes.js
TEST_FILES=tests/test-eg-logic.js
RUN_TESTS=node $(TEST_FILES)

watch:
	ruby ./scripts/watcher.rb '$(RUN_TESTS)' $(JS_FILES) $(TEST_FILES)

PHONY: publish watch
