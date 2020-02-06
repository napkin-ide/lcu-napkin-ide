/**
 * Model for organization options
 */
export class OrgModel {
    /**
     * Property for disabling option
     */
    public Disabled: boolean;

    /**
     * Viewable value
     */
    public Label: string;

    /**
     * Data Value
     */
    public Value: string;

    constructor(opts: OrgModel) {
        Object.assign(this, opts); // destructure values
    }
}
