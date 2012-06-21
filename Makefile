JS_FILES=src/server/eg-probes.js src/server/eg-screening.js
TEST_FILES=tests/test-eg-logic-probes.js tests/test-eg-logic-screening.js
RUN_TESTS=vows tests/*.js

watch:
	ruby ./scripts/watcher.rb '$(RUN_TESTS)' $(JS_FILES) $(TEST_FILES)

PHONY: publish watch
