/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/includes/lint-reporter.js
 */

import gutil from "gulp-util";
import _ from "lodash";
import messages from "./messages";

export type Message = [string, any, any];

/** Class representing a custom reporter for @shopify/theme-lint */
class Reporter {
  successes: Message[];
  failures: Message[];

  constructor() {
    this.successes = [];
    this.failures = [];
  }

  /**
   * Pushes a valid message onto successes.
   *
   * @param {String} message
   * @param {String} file
   */
  success(
    message: string,
    file: any | null = null,
    index: number | null = null
  ) {
    this.successes.push([message, file, index]);
  }

  /**
   * Pushes an invalid message onto failures.
   *
   * @param {String} message
   * @param {String} file
   */
  failure(
    message: string,
    file: any | null = null,
    index: number | null = null
  ) {
    this.failures.push([message, file, index]);
  }

  /**
   * Builds string output for translation tests
   * depending on successes and failures.
   */
  output() {
    const testsRun = this.failures.length + this.successes.length;

    if (this.failures.length === 0) {
      gutil.log(
        "Translation tests complete:",
        gutil.colors.green(`Success (${testsRun} checks run)`)
      );
    } else {
      gutil.log(
        "Translation tests complete:",
        gutil.colors.red(`Failed (${testsRun} checks run)`)
      );

      const failureGroups = _.groupBy(this.failures, (failure) => failure[1]);

      _.forOwn(failureGroups, (failures, file) => {
        gutil.log(gutil.colors.red(`${file}:`));

        failures.map((failure) => {
          return gutil.log(failure[0]);
        });
      });

      throw new Error(messages.translationsFailed());
    }

    this.successes = this.failures = [];
  }
}

module.exports = Reporter;
export default Reporter;
