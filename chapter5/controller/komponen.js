const {komponen}= require('../models')

module.exports = {
    index : async (req,res,next)=>{
        try {
            const Komponen = await komponen.findAll();
            return res.status(200).json({
                status: true,
                message:'success',
                data:Komponen
            });
        } catch (error) {
            next(error)
        }
    },
    store : async (req,res,next)=>{
        try {
            const{name,description} = req.body;
             const Komponen = await komponen.create({
                name:name,
                description:description   
             });
            return res.status(201).json({
                status: true,
                message:'success',
                data: Komponen
            });
        } catch (error) {
            next(error)
        }
    },
    show: async (req,res,next)=>{
        try {
            const {id_komponen} = req.params;

            const Komponen = await komponen.findOne({
                where:{id:id_komponen}
            });

            if (!Komponen){
                return res.status(401).json({
                    status: false,
                    message: `can't find komponen with id ${id_komponen}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: true,
                message:'success',
                data: Komponen
            });
        } catch (error) {
            next(error)
        }
    },
    update: async(req,res,next)=>{
        try {
            const {id_komponen} = req.params;
            // const Channel = await channel.findOne({where:{id:channel_id}});

            const update =await komponen.update(req.body,{where:{id:id_komponen}});
            
            if (update[0] == 0){
                return res.status(404).json({
                    status: false,
                    message: `can't find komponen with id ${id_komponen}`,
                    data: null
                })
            }
            return res.status(201).json({
                status: true,
                message:"success",
                data: update
            })

        } catch (error) {
            next(error)
        }
    },
    destroy: async(req,res,next)=>{
        try {
            const {id_komponen}=req.params;

            const deleted = await komponen.destroy({where:{id:id_komponen}})
            if(!deleted){
                return res.status(404).json({
                    status: false,
                    message:`can't find komponen with id ${id_komponen}`
                })
            }
            
            return res.status(200).json({
                status: true,
                message:'success',
                data: deleted
            });
        } catch (error) {
            next(error)
        }
    }
}