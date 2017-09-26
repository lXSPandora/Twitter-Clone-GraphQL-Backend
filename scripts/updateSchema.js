#!/usr/bin/env babel-node --optional es7.asyncFunctions
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import fs from "fs";
import path from "path";
import schema from "../src/graphql/schema";
// import { schema as schemaConsole } from '../src/console/schema';
import { graphql } from "graphql";
import { introspectionQuery, printSchema } from "graphql/utilities";

async function generateSchema(schema, relativePath) {
  console.log("generate schemas: ", relativePath);

  const result = await graphql(schema, introspectionQuery);

  if (result.errors) {
    console.error(
      "ERROR introspecting schema: ",
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, `${relativePath}/schema.js`),
      JSON.stringify(result, null, 2)
    );

    fs.writeFileSync(
      path.join(__dirname, `${relativePath}/schema.graphql`),
      printSchema(schema)
    );
  }
}

(async () => {
  const configs = [
    {
      schema,
      path: "../src/graphql/"
    }
  ];

  await Promise.all(
    configs.map(async config => {
      await generateSchema(config.schema, config.path);
    })
  );

  process.exit(0);
})();
