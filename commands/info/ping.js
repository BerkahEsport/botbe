export default {
    name: "infobot",
    command: ["infobot"],
    tags: "main",
    desc: "Show this OS spesification...",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, { sock, config, functions}) => {
        let os = (await import('os')).default;
        let v8 = (await import('v8')).default;
        let { performance } = (await import('perf_hooks')).default;
        let eold = performance.now();

        const used = process.memoryUsage();
        const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
            return cpu;
        });
        const cpu = cpus.reduce(
            (last, cpu, _, { length }) => {
                last.total += cpu.total;
                last.speed += cpu.speed / length;
                last.times.user += cpu.times.user;
                last.times.nice += cpu.times.nice;
                last.times.sys += cpu.times.sys;
                last.times.idle += cpu.times.idle;
                last.times.irq += cpu.times.irq;
                return last;
            },
            {
                speed: 0,
                total: 0,
                times: {
                    user: 0,
                    nice: 0,
                    sys: 0,
                    idle: 0,
                    irq: 0,
                },
            }
        );
        let heapStat = v8.getHeapStatistics();
        let neow = performance.now();

        let teks = `
*Ping :* *_${Number(neow - eold).toFixed(2)} milisecond(s)_*

💻 *_Info Server_*
*- Hostname :* ${os.hostname() || hisoka.user?.name}
*- Platform :* ${os.platform()}
*- OS :* ${os.version()} / ${os.release()}
*- Arch :* ${os.arch()}
*- RAM :* ${functions.formatSize(os.totalmem() - os.freemem(), false)} / ${functions.formatSize(os.totalmem(), false)}

*_Runtime OS_*
${functions.runtime(os.uptime())}

*_Runtime Bot_*
${functions.runtime(process.uptime())}

*_NodeJS Memory Usage_*
${Object.keys(used)
    .map((key, _, arr) => `*- ${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')} :* ${functions.formatSize(used[key])}`)
    .join('\n')}
*- Heap Executable :* ${functions.formatSize(heapStat?.total_heap_size_executable)}
*- Physical Size :* ${functions.formatSize(heapStat?.total_physical_size)}
*- Available Size :* ${functions.formatSize(heapStat?.total_available_size)}
*- Heap Limit :* ${functions.formatSize(heapStat?.heap_size_limit)}
*- Malloced Memory :* ${functions.formatSize(heapStat?.malloced_memory)}
*- Peak Malloced Memory :* ${functions.formatSize(heapStat?.peak_malloced_memory)}
*- Does Zap Garbage :* ${functions.formatSize(heapStat?.does_zap_garbage)}
*- Native Contexts :* ${functions.formatSize(heapStat?.number_of_native_contexts)}
*- Detached Contexts :* ${functions.formatSize(heapStat?.number_of_detached_contexts)}
*- Total Global Handles :* ${functions.formatSize(heapStat?.total_global_handles_size)}
*- Used Global Handles :* ${functions.formatSize(heapStat?.used_global_handles_size)}
${
    cpus[0]
        ? `

*_Total CPU Usage_*
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
                .map(type => `*- ${(type + '*').padEnd(6)}: ${((100 * cpu.times[type]) / cpu.total).toFixed(2)}%`)
                .join('\n')}

*_CPU Core(s) Usage (${cpus.length} Core CPU)_*
${cpus
    .map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
                .map(type => `*- ${(type + '*').padEnd(6)}: ${((100 * cpu.times[type]) / cpu.total).toFixed(2)}%`)
                .join('\n')}`).join('\n\n')}`
        : ''}`.trim();
        await m.reply(teks);
	}
}