'use babel';

import StylusBuildLauncher from '../lib/stylus-build-launcher'

// ----------------------------------------------------------------------------

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('stylus-build-launcher', () => {
  let workspaceElement
  let activationPromise

  // ----------------------------------------------------------------------------

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('stylus-build-launcher')
  })

  // ----------------------------------------------------------------------------

  describe('when the stylus-build-launcher:launch event is triggered', () => {

    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel has been created
      expect(workspaceElement.querySelector('.stylus-build-launcher')).not.toExist()

      // This is an activation event, triggering it will cause the package to be activated.
      atom.commands.dispatch(workspaceElement, 'stylus-build-launcher:launch')

      waitsForPromise(() => {
        return activationPromise
      })

      runs(() => {
        expect(workspaceElement.querySelector('.stylus-build-launcher')).toExist()

        // let stylusLauncherElement = workspaceElement.querySelector('.stylus-build-launcher')
        // expect(stylusLauncherElement).toExist()
        //
        // let stylusLauncherPanel = atom.workspace.panelForItem(stylusLauncherElement)
        // expect(stylusLauncherPanel.isVisible()).toBe(true)
        // atom.commands.dispatch(workspaceElement, 'stylus-build-launcher:launch')
        // expect(stylusLauncherPanel.isVisible()).toBe(false)
      })
    })

    // ----------------------------------------------------------------------------

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement)

      expect(workspaceElement.querySelector('.stylus-build-launcher')).not.toExist()

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'stylus-build-launcher:toggle')

      waitsForPromise(() => {
        return activationPromise
      })

      runs(() => {
        // Now we can test for view visibility
        let stylusLauncherElement = workspaceElement.querySelector('.stylus-build-launcher')
        expect(stylusLauncherElement).toBeVisible()
        atom.commands.dispatch(workspaceElement, 'stylus-build-launcher:toggle')
        expect(stylusLauncherElement).not.toBeVisible()
      })
    })
  })

})
