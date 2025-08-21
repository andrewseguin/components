/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {getProjectFromWorkspace, getProjectTargetOptions} from '@angular/cdk/schematics';
import {readWorkspace, updateWorkspace} from '@schematics/angular/utility';
import {Schema} from './schema';
import {join} from 'path';
import {dasherize} from '@angular-devkit/core/src/utils/strings';
import {normalize} from '@angular-devkit/core';

/**
 * Scaffolds a new Tailwind CSS theme file.
 */
export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await readWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const themeName = dasherize(options.name);
    const themePath = normalize(join(project.sourceRoot ?? 'src', `${themeName}.tailwind.css`));

    const template = host.read(
      'src/material/schematics/ng-generate/tailwind-theme/files/__name@dasherize__.tailwind.css.template',
    );

    if (!template) {
      context.logger.error('Could not find template file.');
      return;
    }

    host.create(themePath, template);

    return updateWorkspace(workspace => {
      const targetOptions = getProjectTargetOptions(project, 'build');
      const styles = targetOptions['styles'] as (string | {input: string})[];

      if (!styles) {
        targetOptions['styles'] = [themePath];
      } else {
        styles.unshift(themePath);
      }
    });
  };
}
